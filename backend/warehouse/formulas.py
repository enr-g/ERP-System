from item_specification.models import ItemSpecification
from warehouse.models import WarehouseItemInventory


def get_stock_level_total_current(warehouse):
    try:
        inventories = warehouse.warehouseiteminventory_set.filter(warehouse=warehouse)
        stock_level_total_current = 0
        for inventory in inventories:
            stock_level_total_current += inventory.stock_level_current
        return stock_level_total_current
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_stock_level_total_purchase_value_current(warehouse):
    try:
        inventories = warehouse.warehouseiteminventory_set.filter(warehouse=warehouse)
        stock_level_total_purchase_value_current = 0
        for inventory in inventories:
            stock_level_current = inventory.stock_level_current
            try:
                purchase_price_net_eur = inventory.item.item_specifications.latest('valid_from') \
                    .purchase_price_net_eur
                if purchase_price_net_eur is None:
                    purchase_price_net_eur = 0
                stock_level_purchase_value_current = round(stock_level_current * purchase_price_net_eur, 2)
            except ItemSpecification.DoesNotExist:
                stock_level_purchase_value_current = 0
            stock_level_total_purchase_value_current += stock_level_purchase_value_current
        return stock_level_total_purchase_value_current
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_stock_level_total_sale_value_current(warehouse):
    try:
        inventories = warehouse.warehouseiteminventory_set.filter(warehouse=warehouse)
        stock_level_total_sale_value_current = 0
        for inventory in inventories:
            stock_level_current = inventory.stock_level_current
            try:
                sale_price_net_eur = inventory.item.item_specifications.latest('valid_from') \
                    .sale_price_net_eur
                if sale_price_net_eur is None:
                    sale_price_net_eur = 0
                stock_level_sale_value_current = round(stock_level_current * sale_price_net_eur, 2)
            except ItemSpecification.DoesNotExist:
                stock_level_sale_value_current = 0
            stock_level_total_sale_value_current += stock_level_sale_value_current
        return stock_level_total_sale_value_current
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_error_item_not_assigned_item_specifications(warehouse):
    try:
        inventories = warehouse.warehouseiteminventory_set.filter(warehouse=warehouse)
        error_item_not_assigned_item_specifications = True
        for inventory in inventories:
            try:
                item_specifications = inventory.item.item_specifications.latest('valid_from')
                print(item_specifications)
                error_item_not_assigned_item_specifications = False
            except ItemSpecification.DoesNotExist:
                error_item_not_assigned_item_specifications = True
        return error_item_not_assigned_item_specifications
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_error_item_not_assigned_purchase_price_net_eur(warehouse):
    try:
        inventories = warehouse.warehouseiteminventory_set.filter(warehouse=warehouse)
        error_assignment_purchase_price_net_eur = True
        for inventory in inventories:
            try:
                purchase_price_net_eur = inventory.item.item_specifications.latest('valid_from') \
                    .purchase_price_net_eur
                if purchase_price_net_eur is None:
                    error_assignment_purchase_price_net_eur = True
                    break
                else:
                    error_assignment_purchase_price_net_eur = False
            except ItemSpecification.DoesNotExist:
                error_assignment_purchase_price_net_eur = True
        return error_assignment_purchase_price_net_eur
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_error_item_not_assigned_sale_price_net_eur(warehouse):
    try:
        inventories = warehouse.warehouseiteminventory_set.filter(warehouse=warehouse)
        error_assignment_sale_price_net = True
        for inventory in inventories:
            try:
                sale_price_net_eur = inventory.item.item_specifications.latest('valid_from') \
                    .sale_price_net_eur
                if sale_price_net_eur is None:
                    error_assignment_sale_price_net = True
                    break
                else:
                    error_assignment_sale_price_net = False
            except ItemSpecification.DoesNotExist:
                error_assignment_sale_price_net = True
        return error_assignment_sale_price_net
    except WarehouseItemInventory.DoesNotExist:
        pass
