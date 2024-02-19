from stocks.views import StockAddView, StockListView
from django.urls import path


urlpatterns = [
    path('add_stocks/', StockAddView.as_view(), name = 'add_stocks' ),
    path('stocks-list/', StockListView.as_view(), name='stocks-list')

]
