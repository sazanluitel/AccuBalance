from sales.views import SalesAddView, SalesListView, SalesStatsAPIView
from django.urls import path

urlpatterns = [
    path('add_sales/', SalesAddView.as_view(), name='add_sale'),
    path('sales-list/', SalesListView.as_view(), name='sales_list'),
    path('stats/', SalesStatsAPIView.as_view(), name='sales_stats'),
]
