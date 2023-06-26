import datetime
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from item_specification.models import ItemSpecification
from item_specification.serializers import ItemSpecificationSerializer, UpdateItemSpecificationSerializer
from item.models import Item


class ListItemSpecificationView(ListAPIView):
    """
    get:
    List all item specifications

    # subtitle
    List all specifications of an item of the merchant in chronological order of -valid from
    """

    serializer_class = ItemSpecificationSerializer
    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        item = Item.objects.filter(id=self.kwargs.get('item_id')).first()
        return item.item_specifications.all().order_by('-valid_from')


class CreateItemSpecificationView(CreateAPIView):
    """
    post:
    Create new item specifications

    # subtitle
    Create new specifications related to an item
    """

    queryset = Item.objects.all()
    serializer_class = ItemSpecificationSerializer

    def get_date_time_current(self):
        date_time_current = datetime.datetime.now()
        return date_time_current

    def update_has_specifications(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        item.has_specifications = True
        item.save()

    def update_item_specifications_current(self, date_time_current):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        try:
            item_specifications_latest = item.item_specifications.latest('valid_from')
            item_specifications_latest.valid_to = date_time_current
            item_specifications_latest.save()
        except ItemSpecification.DoesNotExist:
            pass

    def perform_create(self, serializer):
        date_time_current = self.get_date_time_current()
        self.update_item_specifications_current(date_time_current)
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        serializer.save(item=item, valid_from=date_time_current, valid_to=None)
        self.update_has_specifications()


class SearchItemSpecificationView(ListAPIView):
    """
    get:
    Search for specific item specifications

    # subtitle
    Search for specific specifications of an item of the merchant
    """

    serializer_class = ItemSpecificationSerializer

    def get_queryset(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        queryset = ItemSpecification.objects.filter(item__id=item.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(size__icontains=search_value) |
                Q(item_changes__icontains=search_value)
            )
        return queryset_filtered


class UpdateItemSpecificationView(UpdateAPIView):
    """
    patch:
    Update specific item specifications

    # subtitle
    Update specific specifications of an item
    """

    serializer_class = UpdateItemSpecificationSerializer
    lookup_url_kwarg = 'item_specifications_id'

    def get_queryset(self):
        item_specifications_id = self.kwargs.get('item_specifications_id')
        merchant = self.request.user.merchant
        items = Item.objects.filter(merchant_id=merchant.id)
        item_target = items.filter(item_specifications__id=item_specifications_id).first()
        return item_target.item_specifications.all()


class CurrentItemSpecificationView(ListAPIView):
    """
    get:
    Retrieve the current (valid) item specifications

    # subtitle
    Retrieve the current (valid) specifications of an item
    """

    serializer_class = ItemSpecificationSerializer
    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        try:
            item_specifications_latest = item.item_specifications.latest('valid_from')
            item_specifications = ItemSpecification.objects.filter(id=item_specifications_latest.id)
            return item_specifications
        except ItemSpecification.DoesNotExist:
            pass


class ListItemSpecificationChoiceSizeView(APIView):
    """
    get:
    List the available sizes

    # subtitle
    List the available sizes related to the item specifications
    """

    def get(self, request, *args, **kwargs):
        sizes = list(ItemSpecification.size.field.choices)
        choices = []
        for size in sizes:
            choices.append(size[1])
        return Response({"sizes": choices})
