from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from item_model.models import ItemModel
from item_model.serializers import ItemModelSerializer, UpdateItemModelSerializer
from item.models import Item
from item.serializers import ItemSerializer
from item_image.models import Attachment


class ListItemModelView(ListAPIView):
    """
    get:
    List all item models

    # subtitle
    Lists all item models of the merchant in alphabetical order of name
    """

    serializer_class = ItemModelSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return ItemModel.objects.filter(merchant_id=merchant.id).order_by('name')


class CreateItemModelView(CreateAPIView):
    """
    post:
    Create a new item model

    # subtitle
    Create a new item model related to the merchant
    """

    serializer_class = ItemModelSerializer

    def perform_create(self, serializer):
        serializer.save(merchant=self.request.user.merchant)
        images = self.request.FILES.getlist('images')
        for image in images:
            Attachment.objects.create(
                item_model_id=serializer.instance.id,
                image=image
            )


class CreateAssignItemModelView(CreateAPIView):
    """
    post:
    Create and assign a new item model

    # subtitle
    Create a new item model and assign it to an item of the merchant
    """

    serializer_class = ItemModelSerializer

    def perform_create(self, serializer):
        merchant = self.request.user.merchant
        item = Item.objects.filter(pk=self.kwargs.get('item_id'))
        serializer.save(merchant=merchant, items=item)
        images = self.request.FILES.getlist('images')
        for image in images:
            Attachment.objects.create(
                item_model_id=serializer.instance.id,
                image=image
            )


class SearchItemModelView(ListAPIView):
    """
    get:
    Search for a specific item model

    # subtitle
    Search for a specific item model of the merchant
    """

    serializer_class = ItemModelSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = ItemModel.objects.filter(merchant__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(name__icontains=search_value) |
                Q(category__icontains=search_value) |
                Q(color__icontains=search_value) |
                Q(brand_name__icontains=search_value)
            )
        return queryset_filtered


class RetrieveUpdateDestroyItemModelView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific item model

    patch:
    Update a specific item model

    # subtitle
    Retrieve and update a specific item model of the merchant
    """

    lookup_url_kwarg = 'item_model_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return ItemModel.objects.filter(merchant__id=merchant.id)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ItemModelSerializer
        elif self.request.method == 'PATCH':
            return UpdateItemModelSerializer


class AssignItemToItemModelView(UpdateAPIView):
    """
    patch:
    Assign one or many items to the item model

    # subtitle
    Assign one or many items to the item model of the merchant
    """

    serializer_class = ItemModelSerializer
    lookup_url_kwarg = 'item_model_id'

    def update(self, request, *args, **kwargs):
        item_model = ItemModel.objects.get(pk=self.kwargs.get('item_model_id'))
        item_ids = self.request.data['item_ids']
        for item_id in item_ids:
            item = Item.objects.filter(id=item_id).first()
            if item.item_model:
                if item.item_model == item_model:
                    item_model.items.remove(item)
                else:
                    pass
            else:
                item_model.items.add(item)
        return Response({'status': 'Item model updated successfully'})


class ListItemInItemModelView(ListAPIView):
    """
    get:
    List all items related to a specific item model

    # subtitle
    List all items related to a specific item model of the merchant in alphabetical order of SKU number
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        item_model_id = self.kwargs.get('item_model_id')
        return Item.objects.filter(item_models__id=item_model_id).order_by('sku')


class ListItemModelChoiceStatusView(APIView):
    """
    get:
    List all available status

    # subtitle
    List all available status related to the item model
    """

    def get(self, request, *args, **kwargs):
        status_options = list(ItemModel.status.field.choices)
        choices = []
        for status in status_options:
            choices.append(status[1])
        return Response({"status": choices})


class ListItemModelChoiceConditionView(APIView):
    """
    get:
    List all available conditions

    # subtitle
    List all available conditions related to the item model
    """

    def get(self, request, *args, **kwargs):
        conditions = list(ItemModel.condition.field.choices)
        choices = []
        for condition in conditions:
            choices.append(condition[1])
        return Response({"conditions": choices})


class ListItemModelChoiceCategoryView(APIView):
    """
    get:
    List all available categories

    # subtitle
    List all available categories related to the item model
    """

    def get(self, request, *args, **kwargs):
        categories = list(ItemModel.category.field.choices)
        choices = []
        for category in categories:
            choices.append(category[1])
        return Response({"categories": choices})


class ListItemModelChoiceColorView(APIView):
    """
    get:
    List all available colors

    # subtitle
    List all available colors related to the item model
    """

    def get(self, request, *args, **kwargs):
        colors = list(ItemModel.color.field.choices)
        choices = []
        for color in colors:
            choices.append(color[1])
        return Response({"colors": choices})
