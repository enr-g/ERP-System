from django.db.models import Q
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from inventory_ledger.models import InventoryLedger
from item.models import Item
from warehouse.models import Warehouse, WarehouseItemInventory
from warehouse.serializers import WarehouseSerializer
from warehouse.formulas import get_stock_level_total_current, get_stock_level_total_purchase_value_current, \
    get_stock_level_total_sale_value_current, get_error_item_not_assigned_item_specifications, \
    get_error_item_not_assigned_purchase_price_net_eur, get_error_item_not_assigned_sale_price_net_eur


def get_updated_data(warehouse):
    warehouse.stock_level_total_current = get_stock_level_total_current(warehouse)
    warehouse.stock_level_total_purchase_value_current = get_stock_level_total_purchase_value_current(warehouse)
    warehouse.stock_level_total_sale_value_current = get_stock_level_total_sale_value_current(warehouse)
    warehouse.error_item_not_assigned_item_specifications = get_error_item_not_assigned_item_specifications(
        warehouse)
    warehouse.error_item_not_assigned_purchase_price_net_eur = get_error_item_not_assigned_purchase_price_net_eur(
        warehouse)
    warehouse.error_item_not_assigned_sale_price_net_eur = get_error_item_not_assigned_sale_price_net_eur(warehouse)
    return warehouse


def get_updated_queryset(self):
    merchant = self.request.user.merchant
    warehouses = Warehouse.objects.filter(merchants__id=merchant.id).order_by('name')
    for warehouse in warehouses:
        get_updated_data(warehouse)
    return warehouses


class ListWarehouseView(ListAPIView):
    """
    get:
    List all warehouses

    # subtitle
    List all warehouses of the merchant in alphabetical order of name
    """

    serializer_class = WarehouseSerializer

    def get_queryset(self):
        return get_updated_queryset(self)


class CreateWarehouseView(CreateAPIView):
    """
    post:
    Create a new warehouse

    # subtitle
    Create a new warehouse related to the merchant
    """

    serializer_class = WarehouseSerializer

    def post(self, request, *args, **kwargs):
        merchant = request.user.merchant
        warehouse_name = request.data['name']
        if merchant.warehouses.filter(name=warehouse_name).exists():
            return Response({'status': 'Warehouse already exists'})
        else:
            serializer = self.get_serializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            merchant.warehouses.add(serializer.data['id'])
            return Response({'status': 'Warehouse created successfully'})


class UpdateOneItemInWarehouseView(UpdateAPIView):
    """
    patch:
    Update one item in the specific warehouse

    # subtitle
    Update one item in the specific warehouse of the merchant
    """

    serializer_class = WarehouseSerializer
    lookup_url_kwarg = 'warehouse_id'

    def update(self, request, *args, **kwargs):
        warehouse = Warehouse.objects.filter(
            Q(merchants__id=request.user.merchant.id) & Q(id=self.kwargs['warehouse_id'])).first()
        item = Item.objects.filter(id=self.request.data['item_id']).first()
        is_item_in_warehouse = warehouse.items.filter(id=self.request.data['item_id']).exists()
        quantity_altered = self.request.data['quantity']

        def generate_inventory_ledger(action, quantity):
            InventoryLedger.objects.create(warehouse=warehouse, event_type=action,
                                           stock_level_initial=current_stock_level,
                                           quantity_altered=quantity,
                                           stock_level_final=current_stock_level + quantity,
                                           item=item)

        def generate_warehouse_inventory(quantity):
            WarehouseItemInventory.objects.create(warehouse=warehouse, item=item,
                                                  stock_level_current=quantity)

        if is_item_in_warehouse:
            if quantity_altered > 0:
                action = 'Inbound'
            else:
                action = 'Outbound'
            current_stock_level = WarehouseItemInventory.objects.filter(
                item_id=self.request.data['item_id'],
                warehouse_id=self.kwargs['warehouse_id']).get().stock_level_current
            if current_stock_level + quantity_altered < 0:
                return Response({'status': 'Not enough stock in warehouse'})
            else:
                generate_inventory_ledger(action, quantity_altered)
                warehouse_inventory = WarehouseItemInventory.objects.filter(warehouse=warehouse,
                                                                            item=item).get()
                if current_stock_level + quantity_altered == 0:
                    warehouse_inventory.delete()
                    return Response({'status': 'Item removed from warehouse'})
                else:
                    warehouse_inventory.stock_level_current = current_stock_level + quantity_altered
                    warehouse_inventory.save()
                    return Response({'status': 'Stock level updated'})
        else:
            if quantity_altered < 0:
                return Response({'status': 'Negative stock not allowed'})
            else:
                action = 'Inbound'
                current_stock_level = 0
                generate_inventory_ledger(action, quantity_altered)
                generate_warehouse_inventory(quantity_altered)
                return Response({'status': 'Item added to warehouse'})


class UpdateManyItemInWarehouseView(UpdateAPIView):
    """
    patch:
    Update many items in the specific warehouse

    # subtitle
    Update many items in the specific warehouse of the merchant (currently not accessible)
    """

    serializer_class = WarehouseSerializer
    lookup_url_kwarg = 'warehouse_id'

    def update(self, request, *args, **kwargs):
        warehouse = Warehouse.objects.filter(merchants__id=self.kwargs['warehouse_id']).first()
        items = self.request.data['item_ids']
        for item in items:
            exist_item_in_warehouse = warehouse.items.filter(id=item).exists()
            if not exist_item_in_warehouse:
                warehouse.items.add(item)
        return Response({'status': 'Items added to Warehouse'})


class SearchWarehouseView(ListAPIView):
    """
    get:
    Search for a specific warehouse

    # subtitle
    Search for a specific warehouse of the merchant
    """

    serializer_class = WarehouseSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Warehouse.objects.filter(merchants__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(name__icontains=search_value)
            )
        return queryset_filtered


class RetrieveUpdateDestroyWarehouseView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific warehouse

    patch:
    Update a specific warehouse

    # subtitle
    Retrieve and update a specific warehouse of the merchant
    """

    serializer_class = WarehouseSerializer
    lookup_url_kwarg = 'warehouse_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Warehouse.objects.filter(merchants__id=merchant.id)

    def get_object(self):
        warehouse = Warehouse.objects.get(pk=self.kwargs.get('warehouse_id'))
        get_updated_data(warehouse)
        return warehouse


class ListWarehouseAssignedToItemView(ListAPIView):
    """
    get:
    List all warehouses assigned to the specific item

    # subtitle
    List all warehouses assigned to the specific item of the merchant in alphabetical order of name
    """

    serializer_class = WarehouseSerializer

    def get_queryset(self):
        item_id = self.kwargs.get('item_id')
        return Warehouse.objects.filter(items__id=item_id).order_by('name')
