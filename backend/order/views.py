from django.db.models import Q
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from order.models import Order
from order.serializers import OrderSerializer, OrderCreateSerializer
from order.formulas import create_order


def search_by_search_string(self, queryset):
    search_value = self.request.query_params.get('search_string')
    if search_value is not None:
        queryset_filtered = queryset.filter(
            Q(order_number__icontains=search_value) |
            Q(items__sku__icontains=search_value) |
            Q(items__ean__icontains=search_value) |
            Q(items__upc__icontains=search_value) |
            Q(items__series__icontains=search_value) |
            Q(items__amazon_asin__icontains=search_value) |
            Q(items__amazon_fnsku__icontains=search_value) |
            Q(items__name__icontains=search_value) |
            Q(items__item_models__name__icontains=search_value) |
            Q(items__item_models__color__icontains=search_value) |
            Q(items__item_models__category__icontains=search_value) |
            Q(items__item_models__brand_name__icontains=search_value) |
            Q(items__item_models__item_model_specifications__brand_collection__icontains=search_value) |
            Q(merchant__name__icontains=search_value) |
            Q(partner__name__icontains=search_value) |
            Q(warehouse__name__icontains=search_value)
        )
    return queryset_filtered


class ListOrderView(ListAPIView):
    """
    get:
    List all orders

    # subtitle
    List all orders of the merchant in order of -order number
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant_id=merchant.id).order_by('-order_number')


class CreateOrderView(CreateAPIView):
    """
    post:
    Create a new order

    # subtitle
    Create a new order related to the merchant and update the other tables (inventory ledger, warehouse etc.)
    """

    serializer_class = OrderCreateSerializer

    def create(self, request, *args, **kwargs):
        return create_order(self, request)


class SearchOrderView(ListAPIView):
    """
    get:
    Search for a specific order

    # subtitle
    Search for a specific order of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class RetrieveUpdateDestroyOrderView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific partner

    patch:
    Update a specific partner

    # subtitle
    Retrieve and update a specific partner of the merchant
    """

    serializer_class = OrderSerializer
    lookup_url_kwarg = 'order_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant__id=merchant.id)


class ListOrderSupplyView(ListAPIView):
    """
    get:
    List all supplies

    # subtitle
    List all supplies of the merchant in chronological order of -order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=True)).order_by('-order_date')


class SearchOrderSupplyView(ListAPIView):
    """
    get:
    Search for a specific supply

    # subtitle
    Search for a specific supply of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=True))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderSupplySaleView(ListAPIView):
    """
    get:
    List all supplies (sale)

    # subtitle
    List all supplies (sale) of the merchant in chronological order of -order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=True) & Q(is_refund=False))\
            .order_by('-order_date')


class SearchOrderSupplySaleView(ListAPIView):
    """
    get:
    Search for a specific supply (sale)

    # subtitle
    Search for a specific supply (sale) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=True) & Q(is_refund=False))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderSupplyRefundView(ListAPIView):
    """
    get:
    List all supplies (refund)

    # subtitle
    List all supplies (refund) of the merchant in chronological order of -order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=True) & Q(is_refund=True))\
            .order_by('-order_date')


class SearchOrderSupplyRefundView(ListAPIView):
    """
    get:
    Search for a specific supply (refund)

    # subtitle
    Search for a specific supply (refund) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=True) & Q(is_refund=True))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderPurchaseView(ListAPIView):
    """
    get:
    List all purchases

    # subtitle
    List all the purchases of the merchant in chronological order of -order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=False)).order_by('-order_date')


class SearchOrderPurchaseView(ListAPIView):
    """
    get:
    Search for a specific purchase

    # subtitle
    Search for a specific purchase of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=False))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderPurchaseSaleView(ListAPIView):
    """
    get:
    List all purchases (sale)

    # subtitle
    List all purchases (sale) of the merchant in chronological order of -order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=False) & Q(is_refund=False))\
            .order_by('-order_date')


class SearchOrderPurchaseSaleView(ListAPIView):
    """
    get:
    Search for a specific purchase (sale)

    # subtitle
    Search for a specific purchase (sale) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=False) &
                                        Q(is_refund=False))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderPurchaseRefundView(ListAPIView):
    """
    get:
    List all purchases (refund)

    # subtitle
    List all purchases (refund) of the merchant in chronological order of -order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=False) & Q(is_refund=True))\
            .order_by('-order_date')


class SearchOrderPurchaseRefundView(ListAPIView):
    """
    get:
    Search for a specific purchase (refund)

    # subtitle
    Search for a specific purchase (refund) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(Q(merchant__id=merchant.id) & Q(is_merchant_supplier=False) & Q(is_refund=True))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered
