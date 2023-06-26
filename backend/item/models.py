from django.db import models
from merchant.models import Merchant
from partner.models import Partner
from item_model.models import ItemModel


class Item(models.Model):

    STATUS_OPTIONS = [
        ('Active', 'Active'),
        ('No restock', 'No restock')
    ]

    # id
    merchant = models.ForeignKey(to=Merchant, on_delete=models.PROTECT, related_name="items")
    release_date = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
    archiving_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(choices=STATUS_OPTIONS, default="Active")
    sku = models.CharField(unique=True, max_length=20)
    ean = models.CharField(blank=True, null=True, max_length=20)
    upc = models.CharField(blank=True, null=True, max_length=20)
    series = models.CharField(blank=True, null=True, max_length=20)
    amazon_asin = models.CharField(blank=True, null=True, max_length=20)
    amazon_fnsku = models.CharField(blank=True, null=True, max_length=20)
    name = models.CharField(unique=True, max_length=50)
    has_specifications = models.BooleanField(default=False)
    partners = models.ManyToManyField(to=Partner, blank=True, related_name="items")
    item_model = models.ForeignKey(to=ItemModel, on_delete=models.PROTECT, null=True, related_name="items")

    # linkages:
    # warehouse (linked in warehouse.models.py)
    # item_specifications (linked in item_specification.models.py)
    # item_model (linked in item_model.models.py)
    # item_tags (linked in item_tag.models.py)

    # processed values:
    stock_level_total_current = models.IntegerField(default=0)
    stock_level_total_purchase_value_current = models.FloatField(default=0)
    stock_level_total_sale_value_current = models.FloatField(default=0)

    def __str__(self):
        return f'{self.id} - Item name {self.name}'
