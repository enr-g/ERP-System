from rest_framework import serializers
from merchant.serializers import MerchantSerializer
from item.serializers import ItemSerializer
from item_tag.models import ItemTag


class ItemTagSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)
    items = ItemSerializer(read_only=True, many=True)

    class Meta:
        model = ItemTag
        fields = '__all__'
