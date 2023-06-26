from rest_framework import serializers
from merchant.models import MerchantPartnerRelationship
from partner.models import Partner


class MerchantPartnerRelationshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = MerchantPartnerRelationship
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):

    merchant_partner_relationship = MerchantPartnerRelationshipSerializer(source='merchantpartnerrelationship_set',
                                                                          many=True)

    class Meta:
        model = Partner
        fields = '__all__'
        extra_fields = {
            'merchants': {'read_only': True}
        }
