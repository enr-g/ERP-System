from rest_framework.response import Response
from item.models import Item
from item_specification.models import ItemSpecification
from inventory_ledger.models import InventoryLedger
from order.models import Order
from warehouse.models import Warehouse, WarehouseItemInventory


def get_warehouse_inventory(item, warehouse):
    try:
        warehouse_inventory = WarehouseItemInventory.objects.filter(item=item, warehouse=warehouse).get()
        return warehouse_inventory
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_stock_level_current(warehouse_inventory):
    if warehouse_inventory:
        stock_level_current = warehouse_inventory.stock_level_current
    else:
        stock_level_current = 0
    return stock_level_current


def assign_item_to_warehouse(item, warehouse, quantity):
    WarehouseItemInventory.objects.create(item=item, warehouse=warehouse, stock_level_current=quantity)


def update_stock_level(item, warehouse, quantity):
    warehouse_inventory = get_warehouse_inventory(item, warehouse)
    stock_level_current = get_stock_level_current(warehouse_inventory)
    if warehouse_inventory:
        if stock_level_current + quantity == 0:
            warehouse_inventory.delete()
        else:
            warehouse_inventory.stock_level_current = stock_level_current + quantity
            warehouse_inventory.save()
    else:
        assign_item_to_warehouse(item, warehouse, quantity)


def post_inventory_ledger(item, warehouse, action, quantity):
    current_stock_level = get_stock_level_current(get_warehouse_inventory(item, warehouse))
    InventoryLedger.objects.create(item=item,
                                   warehouse=warehouse,
                                   event_type=action,
                                   stock_level_initial=current_stock_level,
                                   quantity_altered=quantity,
                                   stock_level_final=current_stock_level + quantity)


def calculate_total_purchase_value(item, quantity):
    try:
        purchase_price_net_eur = item.item_specifications.latest('valid_from').purchase_price_net_eur
        if purchase_price_net_eur:
            total_purchase_value = round(purchase_price_net_eur * quantity, 2)
            return total_purchase_value
        else:
            pass
    except ItemSpecification.DoesNotExist:
        pass


def calculate_total_sale_value(item, quantity):
    try:
        sale_price_net_eur = item.item_specifications.latest('valid_from').sale_price_net_eur
        if sale_price_net_eur:
            total_sale_value = round(sale_price_net_eur * quantity, 2)
            return total_sale_value
        else:
            pass
    except ItemSpecification.DoesNotExist:
        pass


def post_order(self, request, merchant, quantity, value_total):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(merchant=merchant, quantity=quantity, value_total=value_total)


def process_order_inbound(self, request, merchant, item, warehouse, quantity):
    action = 'Inbound'
    post_inventory_ledger(item, warehouse, action, quantity)
    update_stock_level(item, warehouse, quantity)
    if request.data['is_merchant_supplier']:
        quantity = quantity * -1
        total_value = calculate_total_sale_value(item, quantity)
    else:
        total_value = calculate_total_purchase_value(item, quantity)
    post_order(self, request, merchant, quantity, total_value)
    return {'status': 'Order created and stock level in warehouse updated successfully'}


def process_order_outbound(self, request, merchant, item, warehouse, quantity):
    quantity = quantity * -1
    warehouse_inventory = get_warehouse_inventory(item, warehouse)
    current_stock_level = get_stock_level_current(warehouse_inventory)
    if current_stock_level + quantity < 0:
        return {'status': 'Not enough stock in warehouse'}
    else:
        action = 'Outbound'
        post_inventory_ledger(item, warehouse, action, quantity)
        update_stock_level(item, warehouse, quantity)
        if request.data['is_merchant_supplier']:
            quantity = quantity * -1
            total_value = calculate_total_sale_value(item, quantity)
        else:
            total_value = calculate_total_purchase_value(item, quantity)
        post_order(self, request, merchant, quantity, total_value)
        return {'status': 'Order created and stock level in warehouse updated successfully'}


def create_order(self, request):
    merchant = request.user.merchant
    item = Item.objects.filter(id=request.data['items'][0]).first()
    warehouse = Warehouse.objects.filter(id=request.data['warehouse']).first()
    quantity = request.data['quantity']
    is_merchant_supplier = request.data['is_merchant_supplier']
    is_refund = request.data['is_refund']
    if Order.objects.filter(order_number=request.data['order_number']).exists():
        response = {'status': 'This order number already exists'}
    else:
        if is_merchant_supplier:
            if is_refund:
                response = process_order_inbound(self, request, merchant, item, warehouse, quantity)
            else:
                response = process_order_outbound(self, request, merchant, item, warehouse, quantity)
        else:
            if is_refund:
                response = process_order_outbound(self, request, merchant, item, warehouse, quantity)
            else:
                response = process_order_inbound(self, request, merchant, item, warehouse, quantity)
    return Response(response)
