from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from item.models import Item
from item.serializers import CreateItemSerializer, ItemSerializer, UpdateItemSerializer
from item.formulas import get_stock_level_total_current, get_purchase_price_net_eur, get_sale_price_net_eur, \
    get_stock_level_total_purchase_value_current, get_stock_level_total_sale_value_current
from warehouse.models import WarehouseItemInventory


def get_updated_data(item):
    item.stock_level_total_current = get_stock_level_total_current(item)
    item.stock_level_total_purchase_value_current = get_stock_level_total_purchase_value_current(item)
    item.stock_level_total_sale_value_current = get_stock_level_total_sale_value_current(item)
    return item


def get_updated_queryset(self):
    merchant = self.request.user.merchant
    items = Item.objects.filter(merchant_id=merchant.id).order_by('sku')
    for item in items:
        get_updated_data(item)
    return items


class ListItemView(ListAPIView):
    """
    get:
    List all items

    # subtitle
    Lists all items of the merchant in alphabetical order of SKU number
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        return get_updated_queryset(self)


class CreateItemView(CreateAPIView):
    """
    post:
    Create a new item

    # subtitle
    Create a new item related to the merchant
    """

    serializer_class = CreateItemSerializer

    def perform_create(self, serializer):
        serializer.save(merchant=self.request.user.merchant)


class SearchItemView(ListAPIView):
    """
    get:
    Search for a specific item

    # subtitle
    Search for a specific item of the merchant
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Item.objects.filter(merchant__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(sku__icontains=search_value) |
                Q(ean__icontains=search_value) |
                Q(upc__icontains=search_value) |
                Q(series__icontains=search_value) |
                Q(amazon_asin__icontains=search_value) |
                Q(amazon_fnsku__icontains=search_value) |
                Q(name__icontains=search_value)
            )
        return queryset_filtered


class RetrieveUpdateDestroyItemView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific item

    patch:
    Update a specific item

    # subtitle
    Retrieve and update a specific item of the merchant
    """

    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Item.objects.filter(merchant__id=merchant.id)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateItemSerializer

    def get_object(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        get_updated_data(item)
        return item


class ListItemChoiceStatusView(APIView):
    """
    get:
    List all available status

    # subtitle
    List all available status related to the item
    """

    def get(self, request, *args, **kwargs):
        status_options = list(Item.status.field.choices)
        choices = []
        for status in status_options:
            choices.append(status[1])
        return Response({"status": choices})


class ListItemWithStockView(ListAPIView):
    """
    get:
    List all items with stock

    # subtitle
    Lists all items with stock of the merchant in alphabetical order of SKU number
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        items = Item.objects.filter(merchant_id=merchant.id).order_by('sku')
        filtered_items = []
        for item in items:
            item = get_updated_data(item)
            if get_stock_level_total_current(item) > 0:
                filtered_items.append(item)
        return filtered_items


class ListItemForOrderInboundView(ListAPIView):
    """
    get:
    List all items eligible for outbound orders

    # subtitle
    Lists all items of the merchant with stock and a purchase price assigned in alphabetical order of SKU number
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        items = Item.objects.filter(merchant_id=merchant.id).order_by('sku')
        filtered_items = []
        for item in items:
            item = get_updated_data(item)
            try:
                if get_purchase_price_net_eur(item):
                    filtered_items.append(item)
            except WarehouseItemInventory.DoesNotExist:
                pass
        return filtered_items


class ListItemForOrderOutboundView(ListAPIView):
    """
    get:
    List all items eligible for outbound orders

    # subtitle
    Lists all items of the merchant with stock and a sale price assigned in alphabetical order of SKU number
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        items = Item.objects.filter(merchant_id=merchant.id).order_by('sku')
        filtered_items = []
        for item in items:
            item = get_updated_data(item)
            if get_stock_level_total_current(item) > 0:
                try:
                    if get_sale_price_net_eur(item):
                        filtered_items.append(item)
                except WarehouseItemInventory.DoesNotExist:
                    pass
        return filtered_items
