from item_specification.models import ItemSpecification
from warehouse.models import WarehouseItemInventory


def get_stock_level_total_current(item):
    try:
        inventories = item.warehouseiteminventory_set.filter(item=item)
        stock_level_total_current = 0
        for inventory in inventories:
            stock_level_total_current += inventory.stock_level_current
        return stock_level_total_current
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_purchase_price_net_eur(item):
    try:
        purchase_price_net_eur = item.item_specifications.latest('valid_from').purchase_price_net_eur
        if purchase_price_net_eur:
            return purchase_price_net_eur
        else:
            pass
    except ItemSpecification.DoesNotExist:
        pass


def get_sale_price_net_eur(item):
    try:
        sale_price_net_eur = item.item_specifications.latest('valid_from').sale_price_net_eur
        if sale_price_net_eur:
            return sale_price_net_eur
        else:
            pass
    except ItemSpecification.DoesNotExist:
        pass


def get_stock_level_total_purchase_value_current(item):
    try:
        stock_level_total_current = get_stock_level_total_current(item)
        purchase_price_net_eur = item.item_specifications.latest('valid_from').purchase_price_net_eur
        if purchase_price_net_eur:
            stock_level_total_purchase_value_current = round(stock_level_total_current * purchase_price_net_eur, 2)
            return stock_level_total_purchase_value_current
        else:
            pass
    except ItemSpecification.DoesNotExist:
        pass


def get_stock_level_total_sale_value_current(item):
    try:
        stock_level_total_current = get_stock_level_total_current(item)
        sale_price_net_eur = item.item_specifications.latest('valid_from').sale_price_net_eur
        if sale_price_net_eur:
            stock_level_total_sale_value_current = round(stock_level_total_current * sale_price_net_eur, 2)
            return stock_level_total_sale_value_current
        else:
            pass
    except ItemSpecification.DoesNotExist:
        pass
