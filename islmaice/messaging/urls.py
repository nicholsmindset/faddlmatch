from django.urls import path
from . import views

app_name = 'messaging'

urlpatterns = [
    path('', views.inbox, name='inbox'),
    path('thread/<int:conversation_id>/', views.thread, name='thread'),
    path('start/<int:user_id>/', views.start_or_open_thread, name='start'),
]