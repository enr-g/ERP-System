from rest_framework import serializers
from item_image.models import Attachment


class ItemImageSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Attachment
        fields = '__all__'
