from rest_framework import serializers
from item_model.models import ItemModel
from merchant.serializers import MerchantSerializer
from item_model_specification.serializers import ItemModelSpecificationSerializer
from item.serializers import ItemSerializer
from item_image.serializers import ItemImageSerializer


class ItemModelSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)
    item_model_specifications = ItemModelSpecificationSerializer(read_only=True, many=True)
    items = ItemSerializer(read_only=True, many=True)
    images = ItemImageSerializer(read_only=True, many=True)

    class Meta:
        model = ItemModel
        fields = '__all__'


class UpdateItemModelSerializer(serializers.ModelSerializer):
    images = ItemImageSerializer(read_only=True, many=True)

    class Meta:
        model = ItemModel
        exclude = ('release_date', 'is_archived', 'archiving_date')
