from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from item_tag.models import ItemTag
from item_tag.serializers import ItemTagSerializer
from item.models import Item
from item.serializers import ItemSerializer


class ListItemTagView(ListAPIView):
    """
    get:
    List all item tags

    # subtitle
    List all tem tags of the merchant in alphabetical order of tag name
    """

    serializer_class = ItemTagSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return ItemTag.objects.filter(merchant=merchant).order_by('tag_name')


class CreateItemTagView(CreateAPIView):
    """
    post:
    Create a new item tag

    # subtitle
    Create a new item tag related to the merchant
    """

    serializer_class = ItemTagSerializer

    def perform_create(self, serializer):
        serializer.save(merchant=self.request.user.merchant)


class CreateAssignItemTagView(CreateAPIView):
    """
    post:
    Create and assign a new item tag

    # subtitle
    Create a new item tag and assign it to an item of the merchant
    """

    serializer_class = ItemTagSerializer

    def perform_create(self, serializer):
        merchant = self.request.user.merchant
        item = Item.objects.filter(pk=self.kwargs.get('item_id'))
        serializer.save(merchant=merchant, items=item)


class SearchItemTagView(ListAPIView):
    """
    get:
    Search for a specific item tag

    # subtitle
    Search for a specific item tag created by the merchant
    """

    serializer_class = ItemTagSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = ItemTag.objects.filter(merchant__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                item_tags__tag_name=search_value
            )
        return queryset_filtered


class RetrieveUpdateDestroyItemTagView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific item tag

    patch:
    Update a specific item tag

    delete:
    Delete a specific item tag

    # subtitle
    Retrieve, update and delete a specific item tag of the merchant
    """

    queryset = ItemTag.objects.all()
    serializer_class = ItemTagSerializer
    lookup_url_kwarg = 'item_tag_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return ItemTag.objects.filter(merchant__id=merchant.id)

    def delete(self, request, *args, **kwargs):
        item_tag = ItemTag.objects.get(pk=self.kwargs.get('item_tag_id'))
        items = item_tag.items.all()
        for item in items:
            item_tag.items.remove(item)
        return self.destroy(request, *args, **kwargs)


class AssignItemToItemTagView(UpdateAPIView):
    """
    patch:
    Assign one or many items to an item tag

    # subtitle
    Assign one or many items to an item tag of the merchant
    """

    serializer_class = ItemTagSerializer
    lookup_url_kwarg = 'item_tag_id'

    def update(self, request, *args, **kwargs):
        item_tag = ItemTag.objects.get(pk=self.kwargs.get('item_tag_id'))
        item_ids = self.request.data['item_ids']
        for item_id in item_ids:
            is_item_id_assigned = item_tag.items.filter(id=item_id).exists()
            if is_item_id_assigned:
                item_tag.items.remove(item_id)
            else:
                item_tag.items.add(item_id)
        return Response({'status': 'Item tag updated successfully'})


class ListItemAssignedToItemTagView(ListAPIView):
    """
    get:
    List all items assigned to the specific item tag

    # subtitle
    List all items assigned to the specific item tag of the merchant in alphabetical order of sku
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        item_tag_id = self.kwargs.get('item_tag_id')
        return Item.objects.filter(item_tags__id=item_tag_id).order_by('sku')


class ListItemTagAssignedToItemView(ListAPIView):
    """
    get:
    List all item tags assigned to the specific item

    # subtitle
    List all item tags assigned to the specific item of the merchant in alphabetical order of tag name
    """

    serializer_class = ItemTagSerializer

    def get_queryset(self):
        item_id = self.kwargs.get('item_id')
        return ItemTag.objects.filter(items__id=item_id).order_by('tag_name')
