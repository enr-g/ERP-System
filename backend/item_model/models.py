from django.db import models
from merchant.models import Merchant


class ItemModel(models.Model):

    STATUS_OPTIONS = [
        ('Active', 'Active'),
        ('Sell off', 'Sell off')
    ]

    CONDITIONS = [
        ('New', 'New'),
        ('Used', 'Used'),
    ]

    CATEGORIES = [
        ('Shoes', 'Shoes'),
        ('Apparel', 'Apparel'),
    ]

    COLORS = [
        ('Beige', 'Beige'),
        ('Black', 'Black'),
        ('Blue', 'Blue'),
        ('Brown', 'Brown'),
        ('Green', 'Green'),
        ('Red', 'Red'),
        ('Yellow', 'Yellow'),
        ('White', 'White'),
    ]

    # id
    merchant = models.ForeignKey(to=Merchant, on_delete=models.PROTECT, related_name="item_modelS")
    release_date = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
    archiving_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(choices=STATUS_OPTIONS, default="Active")
    name = models.CharField(unique=True, max_length=50)
    condition = models.CharField(choices=CONDITIONS)
    category = models.CharField(choices=CATEGORIES)
    color = models.CharField(choices=COLORS, max_length=50, blank=True, null=True)
    brand_name = models.CharField(max_length=50, blank=True, null=True)
    has_specifications = models.BooleanField(default=False)

    # linkages:
    # images (linked in item_image.models.py)
    # item_model_specifications (linked in item_model_specification.models.py)

    def __str__(self):
        return f'{self.id} - Item model name {self.name}'
