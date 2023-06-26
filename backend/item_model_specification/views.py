import datetime
from django.db.models import Q
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from item_model_specification.models import ItemModelSpecification
from item_model_specification.serializers import ItemModelSpecificationSerializer, \
    UpdateItemModelSpecificationSerializer
from item_model.models import ItemModel


class ListItemModelSpecificationView(ListAPIView):
    """
    get:
    List all item model specifications

    # subtitle
    List all specifications of an item model of the merchant in chronological order of -valid from
    """

    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_model_id'

    def get_queryset(self):
        item_model = ItemModel.objects.filter(id=self.kwargs.get('item_model_id')).first()
        return item_model.item_model_specifications.all().order_by('-valid_from')


class CreateItemModelSpecificationView(CreateAPIView):
    """
    post:
    Create new item model specifications

    # subtitle
    Create new specifications related to an item model
    """

    queryset = ItemModel.objects.all()
    serializer_class = ItemModelSpecificationSerializer

    def get_date_time_current(self):
        date_time_current = datetime.datetime.now()
        return date_time_current

    def update_has_specifications(self):
        item_model = ItemModel.objects.get(pk=self.kwargs.get('item_model_id'))
        item_model.has_specifications = True
        item_model.save()

    def update_item_model_specifications_current(self, date_time_current):
        item_model = ItemModel.objects.get(pk=self.kwargs.get('item_model_id'))
        try:
            item_model_specifications_latest = item_model.item_model_specifications.latest('valid_from')
            item_model_specifications_latest.valid_to = date_time_current
            item_model_specifications_latest.save()
        except ItemModelSpecification.DoesNotExist:
            pass

    def perform_create(self, serializer):
        date_time_current = self.get_date_time_current()
        self.update_item_model_specifications_current(date_time_current)
        item_model = ItemModel.objects.get(pk=self.kwargs.get('item_model_id'))
        serializer.save(item_model=item_model, valid_from=date_time_current, valid_to=None)
        self.update_has_specifications()


class SearchItemModelSpecificationView(ListAPIView):
    """
    get:
    Search for specific item model specifications

    # subtitle
    Search for specific specifications of an item model of the merchant
    """

    serializer_class = ItemModelSpecificationSerializer

    def get_queryset(self):
        item_model = ItemModel.objects.get(pk=self.kwargs.get('item_model_id'))
        queryset = ItemModelSpecification.objects.filter(item_model__id=item_model.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(brand_collection__icontains=search_value) |
                Q(description_short__icontains=search_value) |
                Q(description_long__icontains=search_value) |
                Q(style__icontains=search_value) |
                Q(size__icontains=search_value) |
                Q(care_instructions__icontains=search_value) |
                Q(item_changes__icontains=search_value)
            )
        return queryset_filtered


class UpdateItemModelSpecificationView(UpdateAPIView):
    """
    patch:
    Update specific item model specifications

    # subtitle
    Update specific specifications of an item model
    """

    serializer_class = UpdateItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_model_specifications_id'

    def get_queryset(self):
        item_model_specifications_id = self.kwargs.get('item_model_specifications_id')
        merchant = self.request.user.merchant
        item_models = ItemModel.objects.filter(merchant_id=merchant.id)
        item_model_target = item_models.filter(item_model_specifications__id=item_model_specifications_id).first()
        return item_model_target.item_model_specifications.all()


class CurrentItemModelSpecificationView(ListAPIView):
    """
    get:
    Retrieve the current (valid) item model specifications

    # subtitle
    Retrieve the current (valid) specifications of an item model of the merchant
    """

    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_model_id'

    def get_queryset(self):
        item_model = ItemModel.objects.get(pk=self.kwargs.get('item_model_id'))
        try:
            item_model_specifications_latest = item_model.item_model_specifications.latest('valid_from')
            item_model_specifications = ItemModelSpecification.objects.filter(id=item_model_specifications_latest.id)
            return item_model_specifications
        except ItemModelSpecification.DoesNotExist:
            pass
