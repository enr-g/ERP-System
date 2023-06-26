from django.db.models import Q
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from merchant.models import MerchantPartnerRelationship
from partner.models import Partner
from partner.serializers import PartnerSerializer


def search_by_search_string(self, queryset):
    search_value = self.request.query_params.get('search_string')
    if search_value is not None:
        queryset_filtered = queryset.filter(
            Q(name__icontains=search_value) |
            Q(contact__icontains=search_value) |
            Q(address__icontains=search_value) |
            Q(email__icontains=search_value)
        )
    return queryset_filtered


class ListPartnerView(ListAPIView):
    """
    get:
    List all partners

    # subtitle
    List all partners of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id).order_by('name')


class CreatePartnerView(CreateAPIView):
    """
    post:
    Create a new partner

    # subtitle
    Create a new partner related to the merchant
    """

    serializer_class = PartnerSerializer

    def post(self, request, *args, **kwargs):
        merchant = self.request.user.merchant
        partner_name = request.data['name']
        is_supplier = request.data['is_supplier']
        is_customer = request.data['is_customer']
        is_partner = merchant.partners.filter(name=partner_name).exists()
        if is_partner:
            return Response({'status': 'Partner already exists'})
        else:
            serializer = self.get_serializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            partner = Partner.objects.filter(name=partner_name).get()
            MerchantPartnerRelationship.objects.create(merchant=merchant, partner=partner, is_supplier=is_supplier,
                                                       is_customer=is_customer)
            return Response({'status': 'Partner created successfully'})


class SearchPartnerView(ListAPIView):
    """
    get:
    Search for a specific partner

    # subtitle
    Search for a specific partner of the merchant
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Partner.objects.filter(merchants__id=merchant.id)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class RetrieveUpdateDestroyPartnerView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific partner

    patch:
    Update a specific partner

    # subtitle
    Retrieve and update a specific partner of the merchant
    """

    serializer_class = PartnerSerializer
    lookup_url_kwarg = 'partner_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id)

    def update(self, request, *args, **kwargs):
        merchant = self.request.user.merchant
        partner = Partner.objects.filter(id=self.kwargs['partner_id']).first()
        is_supplier = request.data['is_supplier']
        is_customer = request.data['is_customer']
        serializer = self.get_serializer(partner, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if partner:
            is_supplier_current = MerchantPartnerRelationship.objects.filter(Q(merchant=merchant) & Q(partner=partner) &
                                                                             Q(is_supplier=True)).exists()
            is_customer_current = MerchantPartnerRelationship.objects.filter(Q(merchant=merchant) & Q(partner=partner) &
                                                                             Q(is_customer=True)).exists()
            if is_supplier_current:
                if is_supplier:
                    pass
                else:
                    MerchantPartnerRelationship.objects.filter(merchant=merchant, partner=partner).update(
                        is_supplier=False)
            else:
                MerchantPartnerRelationship.objects.filter(merchant=merchant, partner=partner).update(
                    is_supplier=is_supplier)
            if is_customer_current:
                if is_customer:
                    pass
                else:
                    MerchantPartnerRelationship.objects.filter(merchant=merchant, partner=partner).update(
                        is_customer=False)
            else:
                MerchantPartnerRelationship.objects.filter(merchant=merchant, partner=partner).update(
                    is_customer=is_customer)
            return Response({'status': 'Partner updated successfully'})
        else:
            return Response({'status': 'Partner does not exist'})

    # def update(self, request, *args, **kwargs):
    #     merchant = self.request.user.merchant
    #     partner = Partner.objects.filter(id=self.kwargs['partner_id']).first()
    #     is_supplier = request.data['is_supplier']
    #     is_customer = request.data['is_customer']
    #     if partner:
    #         MerchantPartnerRelationship.objects.update(merchant=merchant,
    #                                                    partner=partner,
    #                                                    is_supplier=is_supplier,
    #                                                    is_customer=is_customer)
    #         return Response({'status': 'Partner updated successfully'})
    #     else:
    #         return Response({'status': 'Partner does not exist'})


class ListSupplierView(ListAPIView):
    """
    get:
    List all suppliers

    # subtitle
    List all suppliers of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id).filter(merchantpartnerrelationship__is_supplier=True) \
            .order_by('name')


class SearchSupplierView(ListAPIView):
    """
    get:
    Search for a specific supplier

    # subtitle
    Search for a specific supplier of the merchant
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Partner.objects.filter(merchants__id=merchant.id) \
            .filter(merchantpartnerrelationship__is_supplier=True)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListCustomerView(ListAPIView):
    """
    get:
    List all customers

    # subtitle
    List all customers of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id).filter(merchantpartnerrelationship__is_customer=True) \
            .order_by('name')


class SearchCustomerView(ListAPIView):
    """
    get:
    Search for a specific customer

    # subtitle
    Search for a specific customer of the merchant
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Partner.objects.filter(merchants__id=merchant.id) \
            .filter(merchantpartnerrelationship__is_customer=True)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class AssignItemToPartnerView(UpdateAPIView):
    """
    patch:
    Assign one or many items to the partner

    # subtitle
    Assign one or many items to the partner of the merchant
    """

    serializer_class = PartnerSerializer
    lookup_url_kwarg = 'partner_id'

    def update(self, request, *args, **kwargs):
        partner = Partner.objects.get(pk=self.kwargs.get('partner_id'))
        item_ids = self.request.data['item_ids']
        for item_id in item_ids:
            is_item_assigned = partner.items.filter(id=item_id).exists()
            if is_item_assigned:
                partner.items.remove(item_id)
            else:
                partner.items.add(item_id)
        return Response({'status': 'Partner updated successfully'})


class ListPartnerAssignedToItemView(ListAPIView):
    """
    get:
    List all partners assigned to the specific item

    # subtitle
    List all partners assigned to the specific item of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        item_id = self.kwargs.get('item_id')
        return Partner.objects.filter(items__id=item_id).order_by('name')


class ListSupplierAssignedToItemView(ListAPIView):
    """
    get:
    List all suppliers assigned to the specific item

    # subtitle
    List all suppliers assigned to the specific item of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        item_id = self.kwargs.get('item_id')
        return Partner.objects.filter(Q(items__id=item_id) & Q(merchantpartnerrelationship__is_supplier=True)) \
            .order_by('name')


class ListCustomerAssignedToItemView(ListAPIView):
    """
    get:
    List all customers assigned to the specific item

    # subtitle
    List all customers assigned to the specific item of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        item_id = self.kwargs.get('item_id')
        return Partner.objects.filter(Q(items__id=item_id) & Q(merchantpartnerrelationship__is_customer=True)) \
            .order_by('name')
