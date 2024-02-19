from purchase.views import PurchaseAddView, PurchaseListView
from django.urls import path


urlpatterns = [
    path('add_purchase/', PurchaseAddView.as_view(), name = 'add_purchase' ),
    path('purchase-list/', PurchaseListView.as_view(), name='purchase-list')

]
