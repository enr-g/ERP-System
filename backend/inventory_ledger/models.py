from django.core.validators import MinValueValidator
from django.db import models
from item.models import Item
from warehouse.models import Warehouse


class InventoryLedger(models.Model):

    EVENTS = [
        ('Inbound', 'Inbound'),
        ('Outbound', 'Outbound'),
        ('Found', 'Found'),
        ('Corrected', 'Corrected'),
        ('Disposed Of', 'Disposed Of'),
    ]

    # id
    warehouse = models.ForeignKey(to=Warehouse, on_delete=models.PROTECT, related_name="inventory_ledgers")
    event_date = models.DateTimeField(auto_now_add=True)
    event_type = models.CharField(choices=EVENTS)
    stock_level_initial = models.IntegerField(validators=[MinValueValidator(0)])
    quantity_altered = models.IntegerField()
    stock_level_final = models.IntegerField(validators=[MinValueValidator(0)])
    item = models.ForeignKey(to=Item, on_delete=models.PROTECT, related_name="inventory_ledgers")

    def __str__(self):
        return f'{self.id} - Date {self.event_date} - Warehouse {self.warehouse} - Item {self.item}'
