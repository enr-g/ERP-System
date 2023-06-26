from django.urls import path
from warehouse.views import ListWarehouseView, CreateWarehouseView, UpdateOneItemInWarehouseView, \
    SearchWarehouseView, RetrieveUpdateDestroyWarehouseView, ListWarehouseAssignedToItemView

urlpatterns = [
    # backend/api/warehouses/
    path('', ListWarehouseView.as_view()),
    path('new/', CreateWarehouseView.as_view()),
    path('update_items_one/<int:warehouse_id>/', UpdateOneItemInWarehouseView.as_view()),
    # path('update_items_many/<int:warehouse_id>/', UpdateManyItemInWarehouseView.as_view()),
    path('search/', SearchWarehouseView.as_view()),
    path('<int:warehouse_id>/', RetrieveUpdateDestroyWarehouseView.as_view()),
    path('items/<int:item_id>/', ListWarehouseAssignedToItemView.as_view()),
]
