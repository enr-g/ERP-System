from rest_framework import serializers
from warehouse.serializers import WarehouseSerializer
from inventory_ledger.models import InventoryLedger
from item.serializers import ItemSerializer


class InventoryLedgerSerializer(serializers.ModelSerializer):

    warehouse = WarehouseSerializer(read_only=True)
    item = ItemSerializer(read_only=True)

    class Meta:
        model = InventoryLedger
        fields = '__all__'
