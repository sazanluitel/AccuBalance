from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .serializers import StockAddSerializers
from .models import Stock

class StockAddView(APIView):
    def post(self, request):
        items_name = request.data.get('items_name')
        quantity = request.data.get('quantity')
        price = request.data.get('price')

        try:
            self.update_existing_stock(items_name, quantity, price)
            message = f"items '{items_name}' is in stock. Quantity is increased."
        except Stock.DoesNotExist:
            self.add_new_stock(request.data)
            message = f"items '{items_name}' added to stock."

        return Response({"message": message}, status=status.HTTP_201_CREATED)

    def update_existing_stock(self, items_name, quantity, price):
        stock_items = Stock.objects.get(items_name=items_name)
        
        # Calculateing new quantity and new price
        new_quantity = stock_items.quantity + int(quantity)
        new_price = stock_items.price + int(price)
        
        # Checking if new_quantity is not zero to avoid division by zero
        if new_quantity != 0:
            average_price = new_price / new_quantity
            stock_items.quantity = new_quantity
            stock_items.price = average_price
            stock_items.save()

    def add_new_stock(self, data):
        serializer = StockAddSerializers(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()


class StockListView(ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockAddSerializers
