from django.contrib import admin
from partner.models import Partner
from import_export import resources

admin.site.register(Partner)


class PartnerResource(resources.ModelResource):

    class Meta:
        model = Partner
