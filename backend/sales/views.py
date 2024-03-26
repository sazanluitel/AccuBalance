from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import NotFound, ValidationError
from sales.models import Sales
from stocks.models import Stock
from sales.serializers import SalesAddSerializers

class SalesAddView(APIView):
    def post(self, request):
        serializer = SalesAddSerializers(data=request.data)
        if serializer.is_valid():
            sale_data = serializer.validated_data
            try:
                self.make_sale(sale_data)
                message = f"Sale of {sale_data['quantity']} {sale_data['items_name']} made successfully."
                return Response({"detail": message}, status=status.HTTP_201_CREATED)
            except (Stock.DoesNotExist, ValidationError) as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def make_sale(self, sale_data):
        stock = Stock.objects.get(items_name=sale_data["items_name"])
        stock_quantity_before_sale = stock.quantity
        stock.quantity -= sale_data["quantity"]

        if stock.quantity < 0:
            raise ValidationError("Not enough stock available.")

        # Calculate cost price and selling price

        cost_price = stock.price
        selling_price = sale_data["price"]
        
        # Calculate profit or loss
        # profit_or_loss = (selling_price - cost_price)*sale_data["quantity"]

        # Save the sale in Sales model
        Sales.objects.create(
            items_name=sale_data["items_name"],
            quantity=sale_data["quantity"],
            price=sale_data["price"],
            amt_received=sale_data["amt_received"],  # Include amt_received field
            # profit_or_loss=profit_or_loss
        )

        stock.save()


class SalesListView(ListAPIView):
    queryset = Sales.objects.all()
    serializer_class = SalesAddSerializers
