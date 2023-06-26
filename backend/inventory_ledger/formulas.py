from django.db.models import Sum
from django.db.models.functions import TruncDate
from inventory_ledger.models import InventoryLedger
from item.models import Item
from warehouse.models import Warehouse


def get_daily_stock_levels_by_item_and_warehouse(merchant):

    return (
        InventoryLedger.objects
        .filter(item__merchant__id=merchant.id)
        .annotate(date=TruncDate('event_date'))
        .values('date', 'item__name', 'warehouse__name')
        .annotate(stock_level_total=Sum('stock_level_final'))
        .order_by('date')
    )


def get_daily_stock_levels_by_item(merchant):

    return (
        InventoryLedger.objects
        .filter(item__merchant__id=merchant.id)
        .annotate(date=TruncDate('event_date'))
        .values('date', 'item__name')
        .annotate(stock_level_total=Sum('stock_level_final'))
        .order_by('date')
    )


def get_daily_stock_levels_by_item_filtered_by_warehouse(warehouse):
    stock_levels = (
        InventoryLedger.objects
        .filter(warehouse__id=warehouse.id)
        .annotate(date=TruncDate('event_date'))
        .values('date', 'item_id')
        .annotate(stock_level_total=Sum('stock_level_final'))
        .order_by('date')
    )
    stock_level_data = {}
    for level in stock_levels:
        date = level['date'].strftime('%Y-%m-%d')
        item_id = level['item_id']
        stock_level_total = level['stock_level_total']
        if item_id not in stock_level_data:
            stock_level_data[item_id] = {'name': '', 'dataset': []}
        stock_level_data[item_id]['dataset'].append({'x': date, 'y': stock_level_total})
    for item_id, data in stock_level_data.items():
        item = Item.objects.get(pk=item_id)
        data['name'] = item.name
    return list(stock_level_data.values())


def get_daily_stock_levels_by_warehouse(merchant):
    stock_levels = (
        InventoryLedger.objects
        .filter(item__merchant__id=merchant.id)
        .annotate(date=TruncDate('event_date'))
        .values('date', 'warehouse_id')
        .annotate(stock_level_total=Sum('stock_level_final'))
        .order_by('date')
    )
    stock_level_data = {}
    for level in stock_levels:
        date = level['date'].strftime('%Y-%m-%d')
        warehouse_id = level['warehouse_id']
        stock_level_total = level['stock_level_total']
        if warehouse_id not in stock_level_data:
            stock_level_data[warehouse_id] = {'label': '', 'data': []}
        stock_level_data[warehouse_id]['data'].append({'x': date, 'y': stock_level_total})
    for warehouse_id, data in stock_level_data.items():
        warehouse = Warehouse.objects.get(pk=warehouse_id)
        data['label'] = warehouse.name
    return list(stock_level_data.values())


def get_daily_stock_levels_by_warehouse_filtered_by_item(item):
    stock_levels = (
        InventoryLedger.objects
        .filter(item__id=item.id)
        .annotate(date=TruncDate('event_date'))
        .values('date', 'warehouse_id')
        .annotate(stock_level_total=Sum('stock_level_final'))
        .order_by('date')
    )
    stock_level_data = {}
    for level in stock_levels:
        date = level['date'].strftime('%Y-%m-%d')
        warehouse_id = level['warehouse_id']
        stock_level_total = level['stock_level_total']
        if warehouse_id not in stock_level_data:
            stock_level_data[warehouse_id] = {'name': '', 'dataset': []}
        stock_level_data[warehouse_id]['dataset'].append({'x': date, 'y': stock_level_total})
    for warehouse_id, data in stock_level_data.items():
        warehouse = Warehouse.objects.get(pk=warehouse_id)
        data['name'] = warehouse.name
    return list(stock_level_data.values())
