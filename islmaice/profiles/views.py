from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator

from .models import Profile


@login_required
def profile_list(request):
    query = request.GET.get('q', '').strip()
    profiles = Profile.objects.select_related('user').all()
    if query:
        profiles = profiles.filter(display_name__icontains=query)
    paginator = Paginator(profiles, 12)
    page = request.GET.get('page')
    page_obj = paginator.get_page(page)
    return render(request, 'profiles/profile_list.html', {'page_obj': page_obj, 'query': query})


@login_required
def profile_detail(request, pk: int):
    profile = get_object_or_404(Profile.objects.select_related('user'), pk=pk)
    return render(request, 'profiles/profile_detail.html', {'profile': profile})
