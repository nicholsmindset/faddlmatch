from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.db.models import Max
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from .models import Conversation, Message

User = get_user_model()


@login_required
def inbox(request):
    conversations = (
        Conversation.objects.filter(participants=request.user)
        .annotate(last_message_at=Max('messages__created_at'))
        .order_by('-last_message_at', '-created_at')
        .prefetch_related('participants')
    )
    return render(request, 'messaging/inbox.html', {'conversations': conversations})


@login_required
def thread(request, conversation_id: int):
    conversation = get_object_or_404(Conversation.objects.prefetch_related('participants', 'messages'), id=conversation_id)
    if request.user not in conversation.participants.all():
        return redirect('messaging:inbox')
    Message.objects.filter(conversation=conversation).exclude(sender=request.user).update(is_read=True)
    if request.method == 'POST':
        body = request.POST.get('body', '').strip()
        if body:
            Message.objects.create(conversation=conversation, sender=request.user, body=body, created_at=timezone.now())
            return redirect('messaging:thread', conversation_id=conversation.id)
    return render(request, 'messaging/thread.html', {'conversation': conversation})


@login_required
def start_or_open_thread(request, user_id: int):
    other_user = get_object_or_404(User, id=user_id)
    if other_user == request.user:
        return redirect('messaging:inbox')
    conversation = (
        Conversation.objects.filter(participants=request.user)
        .filter(participants__id=other_user.id)
        .first()
    )
    if not conversation:
        conversation = Conversation.objects.create()
        conversation.participants.add(request.user, other_user)
    return redirect('messaging:thread', conversation_id=conversation.id)
