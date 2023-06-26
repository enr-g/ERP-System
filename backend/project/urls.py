from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views
from project import settings

schema_view = get_schema_view(
    openapi.Info(
        title="InvenFlow API",
        default_version='v1',
        description="API to InvenFlow ERP-System developed by Hatice, Pablo, Enrico and Nicolas",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="invenflowzh@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,  # Set to False restrict access to protected endpoints
    permission_classes=(permissions.AllowAny,),  # Permissions for docs access
)

urlpatterns = [
    path('backend/api/admin/', admin.site.urls),

    path('backend/api/docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-swagger-ui'),

    path('backend/api/registration/', include('registration.urls')),

    path('backend/api/auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/api/auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),

    path('backend/api/inventory_ledgers/', include('inventory_ledger.urls')),

    path('backend/api/items/', include('item.urls')),

    path('backend/api/item_specifications/', include('item_specification.urls')),

    path('backend/api/item_models/', include('item_model.urls')),

    path('backend/api/item_model_specifications/', include('item_model_specification.urls')),

    path('backend/api/item_tags/', include('item_tag.urls')),

    path('backend/api/merchants/', include('merchant.urls')),

    path('backend/api/orders/', include('order.urls')),

    path('backend/api/partners/', include('partner.urls')),

    path('backend/api/users/', include('user.urls')),

    path('backend/api/warehouses/', include('warehouse.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
