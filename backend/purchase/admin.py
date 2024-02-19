from django.contrib import admin
from purchase.models import Purchase

class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'items_name', 'quantity')


admin.site.register(Purchase, PurchaseAdmin)
