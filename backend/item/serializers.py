from rest_framework import serializers
from item.models import Item
from item_model.models import ItemModel
from item_tag.models import ItemTag
from warehouse.models import WarehouseItemInventory
from merchant.serializers import MerchantSerializer
from item_specification.serializers import ItemSpecificationSerializer
from item_image.serializers import ItemImageSerializer
from partner.serializers import PartnerSerializer


class CreateItemSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class ItemWarehouseInventorySerializer(serializers.ModelSerializer):

    class Meta:
        model = WarehouseItemInventory
        fields = '__all__'


class OnlyItemModelSerializer(serializers.ModelSerializer):

    images = ItemImageSerializer(read_only=True, many=True)

    class Meta:
        model = ItemModel
        fields = '__all__'


class OnlyItemTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemTag
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)
    item_specifications = ItemSpecificationSerializer(read_only=True, many=True)
    item_model = OnlyItemModelSerializer(read_only=True)
    item_warehouse_inventory = ItemWarehouseInventorySerializer(source='warehouseiteminventory_set', many=True)
    item_tags = OnlyItemTagSerializer(read_only=True, many=True)
    partners = PartnerSerializer(read_only=True, many=True)

    class Meta:
        model = Item
        fields = '__all__'


class UpdateItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        exclude = ('release_date', 'is_archived', 'archiving_date')
