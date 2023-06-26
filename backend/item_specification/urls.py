from django.urls import path
from item_specification.views import ListItemSpecificationView, CreateItemSpecificationView, \
    SearchItemSpecificationView, UpdateItemSpecificationView, CurrentItemSpecificationView, \
    ListItemSpecificationChoiceSizeView

urlpatterns = [
    # backend/api/item_specifications/
    path('<int:item_id>/', ListItemSpecificationView.as_view()),
    path('new/<int:item_id>/', CreateItemSpecificationView.as_view()),
    path('search/<int:item_id>/', SearchItemSpecificationView.as_view()),
    path('update/<int:item_specifications_id>/', UpdateItemSpecificationView.as_view()),
    path('current/<int:item_id>/', CurrentItemSpecificationView.as_view()),
    path('choices/sizes/', ListItemSpecificationChoiceSizeView().as_view())
]
