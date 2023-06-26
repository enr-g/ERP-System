from django.urls import path
from item.views import ListItemView, CreateItemView, SearchItemView, RetrieveUpdateDestroyItemView, \
    ListItemChoiceStatusView, ListItemWithStockView, ListItemForOrderInboundView, ListItemForOrderOutboundView

urlpatterns = [
    # backend/api/items/
    path('', ListItemView.as_view()),
    path('new/', CreateItemView.as_view()),
    path('search/', SearchItemView.as_view()),
    path('<int:item_id>/', RetrieveUpdateDestroyItemView.as_view()),
    path('choices/status/', ListItemChoiceStatusView().as_view()),

    path('stock/', ListItemWithStockView.as_view()),
    path('order_inbound/', ListItemForOrderInboundView.as_view()),
    path('order_outbound/', ListItemForOrderOutboundView.as_view()),
]
