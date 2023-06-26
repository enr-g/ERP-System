from django.db import models
from django.contrib.auth import get_user_model
from item.models import Item
from merchant.models import Merchant
from partner.models import Partner
from warehouse.models import Warehouse

User = get_user_model()


class Order(models.Model):

    # id
    order_number = models.CharField(unique=True, max_length=50)
    order_date = models.DateTimeField(auto_now_add=True)
    shipment_date = models.DateTimeField()
    is_refund = models.BooleanField(default=False)
    items = models.ManyToManyField(to=Item, blank=True, related_name="orders")
    quantity = models.IntegerField()
    merchant = models.ForeignKey(to=Merchant, on_delete=models.PROTECT, related_name="orders")
    is_merchant_supplier = models.BooleanField(default=True)
    partner = models.ForeignKey(to=Partner, on_delete=models.PROTECT, related_name="orders")
    warehouse = models.ForeignKey(to=Warehouse, on_delete=models.PROTECT, related_name="orders")

    # processed values:
    value_total = models.FloatField(default=0)

    def __str__(self):
        return f'{self.id} - Date {self.order_date} - Merchant is supplier {self.is_merchant_supplier} - Is refund \
        {self.is_refund}- Partner {self.partner} - Warehouse {self.warehouse}'
