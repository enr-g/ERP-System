from django.urls import path
from item_model.views import ListItemModelView, CreateItemModelView, CreateAssignItemModelView, SearchItemModelView, \
    RetrieveUpdateDestroyItemModelView, AssignItemToItemModelView, ListItemInItemModelView, \
    ListItemModelChoiceStatusView, ListItemModelChoiceConditionView, ListItemModelChoiceCategoryView, \
    ListItemModelChoiceColorView

urlpatterns = [
    # backend/api/items_models/
    path('', ListItemModelView.as_view()),
    path('new/', CreateItemModelView.as_view()),
    path('items/new/<int:item_id>/', CreateAssignItemModelView.as_view()),
    path('search/', SearchItemModelView.as_view()),
    path('<int:item_model_id>/', RetrieveUpdateDestroyItemModelView.as_view()),
    path('assign/<int:item_model_id>/', AssignItemToItemModelView.as_view()),
    path('items/<int:item_model_id>/', ListItemInItemModelView.as_view()),
    path('choices/status/', ListItemModelChoiceStatusView().as_view()),
    path('choices/conditions/', ListItemModelChoiceConditionView().as_view()),
    path('choices/categories/', ListItemModelChoiceCategoryView().as_view()),
    path('choices/colors/', ListItemModelChoiceColorView().as_view())
]
