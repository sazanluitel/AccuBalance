from django.contrib import admin
from sales.models import Sales


class SalesAdmin(admin.ModelAdmin):
    pass

admin.site.register(Sales, SalesAdmin)