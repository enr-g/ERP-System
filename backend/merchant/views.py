from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from merchant.models import Merchant
from merchant.serializers import MerchantSerializer
from user.models import User
from project.global_permissions import IsSameUser


class CreateMerchantView(CreateAPIView):
    """
    post:
    Create a new merchant

    # subtitle
    Create a new merchant
    """

    queryset = Merchant.objects.all()
    serializer_class = MerchantSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyMerchantRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsSameUser]
    serializer_class = MerchantSerializer

    def get_object(self):
        try:
            return self.request.user.merchant
        except Merchant.DoesNotExist:
            pass


class SignInMerchantRetrieveUpdateDeleteView(ListAPIView):

    serializer_class = MerchantSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        if User.objects.filter(email=data['email']).exists():
            user = User.objects.filter(email=data['email']).first()
            if Merchant.objects.filter(user__id=user.id).exists():
                merchant = Merchant.objects.filter(user__id=user.id).first()
                serializer = self.get_serializer(merchant)
                return Response(serializer.data)
            else:
                return Response({'Error': 'User has not merchant assigned'})
        else:
            return Response({'Error': 'User does not exist'})
