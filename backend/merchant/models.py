from django.db import models
from partner.models import Partner
from django.contrib.auth import get_user_model
User = get_user_model()


def merchant_directory_path(instance, filename):
    return f"merchants/{instance.id}/{filename}"


class Merchant(models.Model):

    # id
    user = models.OneToOneField(to=User, on_delete=models.PROTECT, related_name='merchant')
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=2, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to=merchant_directory_path, null=True, blank=True)
    partners = models.ManyToManyField(to=Partner, through='MerchantPartnerRelationship', related_name='merchants')

    # linkages:
    # item_models (linked in item_model.models.py)
    # items (linked in item.models.py)
    # item_tags (linked in item_tags.models.py)
    # orders (linked in order.models.py)

    def __str__(self):
        return self.name


class MerchantPartnerRelationship(models.Model):

    # id
    created = models.DateTimeField(auto_now_add=True)
    merchant = models.ForeignKey(to=Merchant, on_delete=models.PROTECT)
    partner = models.ForeignKey(to=Partner, on_delete=models.PROTECT)
    is_supplier = models.BooleanField()
    is_customer = models.BooleanField()
