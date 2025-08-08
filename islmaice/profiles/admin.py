from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'display_name', 'user', 'age', 'gender', 'location')
    search_fields = ('display_name', 'user__username', 'location', 'interests')
