from django.db import models
from merchant.models import Merchant
from item.models import Item


class ItemTag(models.Model):

    # id
    merchant = models.ForeignKey(to=Merchant, on_delete=models.PROTECT, related_name="item_tags")
    items = models.ManyToManyField(to=Item, blank=True, related_name="item_tags")
    tag_name = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return f'{self.id} - Item Tag {self.tag_name}'
