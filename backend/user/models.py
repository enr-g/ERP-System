from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_path(instance, filename):
    return f"users/{instance.id}/{filename}"


class User(AbstractUser):

    # field used for authentication
    USERNAME_FIELD = 'email'

    # additional fields required when using createsuperuser (USERNAME_FIELD and passwords always required)
    REQUIRED_FIELDS = ['username']

    # id
    # username
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to=user_directory_path, null=True, blank=True)

    # linkages:
    # registration (linked in registration.models.py)
    # merchant (linked in merchant.models.py)

    def __str__(self):
        return self.username
