from sales.views import SalesAddView, SalesListView
from django.urls import path


urlpatterns = [
    path('add_sales/', SalesAddView.as_view(), name = 'add_sales' ),
    path('sales-list/', SalesListView.as_view(), name='sales-list')
]
