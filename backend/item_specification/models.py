from django.core.validators import MinValueValidator
from django.db import models
from item.models import Item


class ItemSpecification(models.Model):

    SIZES = [
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
        ('3XL', '3XL'),
        ('4XL', '4XL'),
        ('5XL', '5XL'),
        ('36', '36'),
        ('37', '37'),
        ('38', '38'),
        ('39', '39'),
        ('40', '40'),
        ('41', '41'),
        ('42', '42'),
        ('43', '43'),
        ('44', '44'),
        ('45', '45'),
        ('46', '46'),
    ]

    # id
    valid_from = models.DateTimeField(blank=True)
    valid_to = models.DateTimeField(blank=True, null=True)
    item = models.ForeignKey(to=Item, on_delete=models.PROTECT, related_name="item_specifications")
    weight_net_kg = models.FloatField(validators=[MinValueValidator(0)], blank=True, null=True)
    weight_gross_kg = models.FloatField(validators=[MinValueValidator(0)], blank=True, null=True)
    length_cm = models.FloatField(validators=[MinValueValidator(0)], blank=True, null=True)
    width_cm = models.FloatField(validators=[MinValueValidator(0)], blank=True, null=True)
    height_cm = models.FloatField(validators=[MinValueValidator(0)], blank=True, null=True)
    size = models.CharField(choices=SIZES, max_length=50, blank=True, null=True)
    purchase_price_net_eur = models.FloatField(validators=[MinValueValidator(0)], blank=True, null=True)
    sale_price_net_eur = models.FloatField(validators=[MinValueValidator(0)], blank=True, null=True)
    stock_level_minimum = models.IntegerField(validators=[MinValueValidator(0)], blank=True, null=True)
    stock_level_reorder = models.IntegerField(validators=[MinValueValidator(0)], blank=True, null=True)
    item_changes = models.CharField(max_length=150)

    def __str__(self):
        return f'{self.id} - Item specifications of {self.item.name}'
