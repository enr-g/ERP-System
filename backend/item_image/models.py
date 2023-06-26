from django.db import models
from item_model.models import ItemModel


def item_model_image_directory_path(instance, filename):
    return f"item-models/{instance.item_model_id}/{filename}"


class Attachment(models.Model):

    item_model = models.ForeignKey(
        to=ItemModel,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(
        upload_to=item_model_image_directory_path,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = 'Attachment'
        verbose_name_plural = 'Attachments'
