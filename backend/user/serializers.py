from django.contrib.auth import get_user_model
from rest_framework import serializers
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ('password', 'is_staff', 'is_active', 'date_joined', 'is_superuser', 'user_permissions', 'groups')


class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'phone', 'email', 'profile_picture']
