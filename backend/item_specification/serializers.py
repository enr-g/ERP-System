from rest_framework import serializers
from item.models import Item
from item_specification.models import ItemSpecification


class DisplayItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'


class ItemSpecificationSerializer(serializers.ModelSerializer):

    item = DisplayItemSerializer(read_only=True)

    class Meta:
        model = ItemSpecification
        fields = '__all__'


class UpdateItemSpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemSpecification
        exclude = ('valid_from', 'valid_to')
