from django.urls import path

from inventory_ledger.views import ListInventoryLedgerPositionView, SearchInventoryLedgerPositionView, \
    ListInventoryLedgerFilteredByItemView, ListInventoryLedgerFilteredByWarehouseView, \
    StockCurrentDailyByItemAndWarehouseView, StockCurrentDailyByItemView, \
    StockCurrentDailyByItemFilterByWarehouseView, StockCurrentWarehouseDateView, \
    StockCurrentDailyByWarehouseFilterByItemView

urlpatterns = [
    # backend/api/inventory_ledgers/
    path('', ListInventoryLedgerPositionView.as_view()),
    path('search/', SearchInventoryLedgerPositionView.as_view()),
    path('items/<int:item_id>/', ListInventoryLedgerFilteredByItemView.as_view()),
    path('warehouses/<int:warehouse_id>/', ListInventoryLedgerFilteredByWarehouseView.as_view()),
    path('stock_current_daily_item_warehouse/', StockCurrentDailyByItemAndWarehouseView.as_view()),
    path('stock_current_daily_item/', StockCurrentDailyByItemView.as_view()),
    path('stock_current_daily_item/<int:warehouse_id>/', StockCurrentDailyByItemFilterByWarehouseView.as_view()),
    path('stock_current_daily_warehouse/', StockCurrentWarehouseDateView.as_view()),
    path('stock_current_daily_warehouse/<int:item_id>/', StockCurrentDailyByWarehouseFilterByItemView.as_view()),
]
