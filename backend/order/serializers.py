from rest_framework import serializers
from item.serializers import ItemSerializer
from merchant.serializers import MerchantSerializer
from order.models import Order
from partner.serializers import PartnerSerializer
from warehouse.serializers import WarehouseSerializer


class OrderSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)
    partner = PartnerSerializer(read_only=True)
    items = ItemSerializer(read_only=True, many=True)
    warehouse = WarehouseSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class OrderCreateSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
