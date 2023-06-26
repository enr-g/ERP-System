from rest_framework import serializers
from warehouse.models import WarehouseItemInventory
from item.serializers import ItemSerializer
from merchant.serializers import MerchantSerializer
from warehouse.models import Warehouse


class WarehouseItemInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseItemInventory
        fields = '__all__'


class WarehouseSerializer(serializers.ModelSerializer):

    merchants = MerchantSerializer(read_only=True, many=True)
    items = ItemSerializer(read_only=True, many=True)
    warehouse_item_inventory = WarehouseItemInventorySerializer(source='warehouseiteminventory_set', many=True)

    class Meta:
        model = Warehouse
        fields = '__all__'
