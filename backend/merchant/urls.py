from django.urls import path
from merchant.views import CreateMerchantView, MyMerchantRetrieveUpdateDeleteView, \
    SignInMerchantRetrieveUpdateDeleteView

urlpatterns = [
    # backend/api/merchants/
    path('new/', CreateMerchantView.as_view()),
    path("me/", MyMerchantRetrieveUpdateDeleteView.as_view()),
    path("signin/me/", SignInMerchantRetrieveUpdateDeleteView.as_view()),
]
