from django.core.validators import MinValueValidator
from django.db import models
from item.models import Item
from merchant.models import Merchant


class Warehouse(models.Model):

    STATUS_OPTIONS = [
        ('Active', 'Active'),
        ('To shut down', 'To shut down'),
    ]

    # id
    creation_date = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
    archiving_date = models.DateTimeField(blank=True, null=True)
    merchants = models.ManyToManyField(to=Merchant, related_name="warehouses")
    items = models.ManyToManyField(to=Item, through='WarehouseItemInventory', related_name="warehouses")
    name = models.CharField(max_length=50)
    contact = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    country_code = models.CharField(max_length=2, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)
    status = models.CharField(choices=STATUS_OPTIONS, default="Active")
    is_standard = models.BooleanField(blank=True, null=True)

    # linkages:
    # inventory_ledgers (linked in inventory_ledger.models.py)

    # processed values:
    stock_level_total_current = models.IntegerField(default=0)
    stock_level_total_purchase_value_current = models.FloatField(default=0)
    stock_level_total_sale_value_current = models.FloatField(default=0)

    # processed errors:
    error_item_not_assigned_item_specifications = models.BooleanField(default=True)
    error_item_not_assigned_purchase_price_net_eur = models.BooleanField(default=True)
    error_item_not_assigned_sale_price_net_eur = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.id} - Warehouse {self.name}'


class WarehouseItemInventory(models.Model):

    # id
    warehouse = models.ForeignKey(to=Warehouse, on_delete=models.PROTECT)
    item = models.ForeignKey(to=Item, on_delete=models.PROTECT)
    stock_level_current = models.IntegerField(validators=[MinValueValidator(0)], blank=True, null=True)
