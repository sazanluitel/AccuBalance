from django.contrib import admin
from stocks.models import Stock


class StockAdmin(admin.ModelAdmin):
    pass

admin.site.register(Stock, StockAdmin)