from django.urls import path
from item_tag.views import ListItemTagView, CreateItemTagView, CreateAssignItemTagView, SearchItemTagView, \
    RetrieveUpdateDestroyItemTagView, AssignItemToItemTagView, ListItemAssignedToItemTagView, \
    ListItemTagAssignedToItemView

urlpatterns = [
    # backend/api/item_tags/
    path('', ListItemTagView.as_view()),
    path('new/', CreateItemTagView.as_view()),
    path('items/new/<int:item_id>/', CreateAssignItemTagView.as_view()),
    path('search/', SearchItemTagView.as_view()),
    path('update/<int:item_tag_id>/', RetrieveUpdateDestroyItemTagView.as_view()),
    path('assign/<int:item_tag_id>/', AssignItemToItemTagView.as_view()),
    path('<int:item_tag_id>/', ListItemAssignedToItemTagView.as_view()),
    path('items/<int:item_id>/', ListItemTagAssignedToItemView.as_view()),
]
