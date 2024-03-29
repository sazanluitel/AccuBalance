# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from purchase.models import Purchase
from stocks.models import Stock
from stocks.serializers import StockAddSerializers
from purchase.serializers import PurchaseAddSerializers

class PurchaseAddView(APIView):
    def post(self, request):
        serializer = PurchaseAddSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()

            try:
                self.update_existing_stock(request.data)
                message = f"Item '{request.data['items_name']}' is in stock. Quantity is increased."
            except Stock.DoesNotExist:
                self.add_new_stock(request.data)
                message = f"Item '{request.data['items_name']}' added to stock."
            
            return Response({"detail": message}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_existing_stock(self, data):
        items_name = data['items_name']
        quantity = data['quantity']
        price = data['price']
        
        stock_item = Stock.objects.get(items_name=items_name)
        
        # Calculate new quantity and new price
        new_quantity = stock_item.quantity + int(quantity)
        new_price = stock_item.price + int(price)
        
        # Checking if new_quantity is not zero to avoid division by zero
        if new_quantity != 0:
            average_price = new_price / new_quantity
            stock_item.quantity = new_quantity
            stock_item.price = average_price
            stock_item.save()

    def add_new_stock(self, data):
        serializer = StockAddSerializers(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        
class PurchaseStatsAPIView(APIView):
    def get(self, request):
        num_of_purchases = Purchase.num_of_purchases()
        total_purchase_amount = Purchase.total_purchase_amount()
        total_payable_amount = Purchase.total_payable_amount()

        stats = {
            "num_of_purchases": num_of_purchases,
            "total_purchase_amount": total_purchase_amount,
            "total_payable_amount": total_payable_amount,
        }
        return Response(stats, status=status.HTTP_200_OK)

class PurchaseListView(ListAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseAddSerializers
