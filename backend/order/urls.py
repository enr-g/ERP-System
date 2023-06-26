from django.urls import path
from order.views import ListOrderView, CreateOrderView, SearchOrderView, RetrieveUpdateDestroyOrderView, \
    ListOrderSupplyView, SearchOrderSupplyView, ListOrderSupplySaleView, SearchOrderSupplySaleView, \
    ListOrderSupplyRefundView, SearchOrderSupplyRefundView, ListOrderPurchaseView, SearchOrderPurchaseView, \
    ListOrderPurchaseSaleView, SearchOrderPurchaseSaleView, ListOrderPurchaseRefundView, SearchOrderPurchaseRefundView

urlpatterns = [
    # backend/api/orders/
    path('', ListOrderView.as_view()),
    path('new/', CreateOrderView.as_view()),
    path('search/', SearchOrderView.as_view()),
    path('<int:order_id>/', RetrieveUpdateDestroyOrderView.as_view()),

    path('supplies/', ListOrderSupplyView.as_view()),
    path('supplies/search/', SearchOrderSupplyView.as_view()),

    path('supplies/sales/', ListOrderSupplySaleView.as_view()),
    path('supplies/sales/search/', SearchOrderSupplySaleView.as_view()),

    path('supplies/refunds/', ListOrderSupplyRefundView.as_view()),
    path('supplies/refunds/search/', SearchOrderSupplyRefundView.as_view()),

    path('purchases/', ListOrderPurchaseView.as_view()),
    path('purchases/search/', SearchOrderPurchaseView.as_view()),

    path('purchases/sales/', ListOrderPurchaseSaleView.as_view()),
    path('purchases/sales/search/', SearchOrderPurchaseSaleView.as_view()),

    path('purchases/refunds/', ListOrderPurchaseRefundView.as_view()),
    path('purchases/refunds/search/', SearchOrderPurchaseRefundView.as_view()),
]
