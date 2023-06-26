from django.db import models


class Partner(models.Model):

    # id
    creation_date = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
    archiving_date = models.DateTimeField(blank=True, null=True)
    name = models.CharField(max_length=50)
    contact = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=2, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField()

    # linkages:
    # merchants (linked in merchant.models.py)
    # merchantpartnerrelationship (linked in merchant.models.py)
    # items (linked in item.models.py)
    # orders (linked in order.models.py)

    def __str__(self):
        return f'{self.id} - Partner {self.name}'
