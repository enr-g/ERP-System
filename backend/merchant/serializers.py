from rest_framework import serializers
from merchant.models import Merchant
from user.serializers import UserSerializer
from partner.serializers import PartnerSerializer


class MerchantSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    partners = PartnerSerializer(read_only=True, many=True)

    class Meta:
        model = Merchant
        fields = '__all__'
