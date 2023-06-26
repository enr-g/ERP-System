from django.urls import path
from item_model_specification.views import ListItemModelSpecificationView, CreateItemModelSpecificationView, \
    SearchItemModelSpecificationView, UpdateItemModelSpecificationView, CurrentItemModelSpecificationView

urlpatterns = [
    # backend/api/item_model_specifications/
    path('<int:item_model_id>/', ListItemModelSpecificationView.as_view()),
    path('new/<int:item_model_id>/', CreateItemModelSpecificationView.as_view()),
    path('search/<int:item_model_id>/', SearchItemModelSpecificationView.as_view()),
    path('update/<int:item_model_specifications_id>/', UpdateItemModelSpecificationView.as_view()),
    path('current/<int:item_model_id>/', CurrentItemModelSpecificationView.as_view())
]
