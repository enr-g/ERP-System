from django.db import models
from item_model.models import ItemModel


class ItemModelSpecification(models.Model):

    # id
    valid_from = models.DateTimeField(blank=True)
    valid_to = models.DateTimeField(blank=True, null=True)
    item_model = models.ForeignKey(to=ItemModel, on_delete=models.PROTECT, related_name="item_model_specifications")
    brand_collection = models.CharField(max_length=50, blank=True, null=True)
    description_short = models.CharField(max_length=150, blank=True, null=True)
    description_long = models.CharField(max_length=1000, blank=True, null=True)
    style = models.CharField(max_length=50, blank=True, null=True)
    care_instructions = models.CharField(max_length=150, blank=True, null=True)
    item_model_changes = models.CharField(max_length=150)

    def __str__(self):
        return f'{self.id} - Item model specifications of {self.item_model.name}'
