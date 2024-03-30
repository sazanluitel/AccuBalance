from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import NotFound, ValidationError
from django.shortcuts import get_object_or_404
from sales.models import Sales
from stocks.models import Stock
from sales.serializers import SalesAddSerializers
from django.core.mail import send_mail
from django.conf import settings
from collections import defaultdict


class SalesAddView(APIView):
    def post(self, request):
        serializer = SalesAddSerializers(data=request.data)
        if serializer.is_valid():
            sale_data = serializer.validated_data
            try:
                # Get the corresponding stock item
                stock_item = get_object_or_404(Stock, items_name=sale_data["items_name"])
                # Check if there is enough stock available
                if stock_item.quantity < sale_data["quantity"]:
                    raise ValidationError("Not enough stock available.")
                # Deduct sold quantity from stock
                stock_item.quantity -= sale_data["quantity"]
                stock_item.save()
                # Save the sale in Sales model
                serializer.save()
                message = f"Sale of {sale_data['quantity']} {sale_data['items_name']} made successfully."
                return Response({"detail": message}, status=status.HTTP_201_CREATED)
            except (Stock.DoesNotExist, ValidationError) as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class SalesStatsAPIView(APIView):
    def get(self, request):
        num_of_sells = Sales.num_of_sells()
        stats = {
            "num_of_sells": num_of_sells,
            "total_sales_amount": Sales.total_sales_amount(),
            "total_receivable_amt": Sales.total_receivable_amt(),
            "total_tax_amount": Sales.total_tax_amount(),
        }
        return Response(stats, status=status.HTTP_200_OK)


class SalesListView(ListAPIView):
    queryset = Sales.objects.all()
    serializer_class = SalesAddSerializers


class ItemsSoldCounterView(APIView):
    def get(self, request):
        items_sold = self.items_sold_counter()
        self.check_popular_items(items_sold)
        return Response(items_sold, status=status.HTTP_200_OK)

    def items_sold_counter(self):
        sales_data = Sales.objects.all()
        items_sold = defaultdict(int)
        for sale in sales_data:
            items_sold[sale.items_name] += 1
        return dict(items_sold)

    def send_popular_item_email(self, item_name):
        subject = 'Popular Items Alert'
        message = f'The item {item_name} is popular today. Please buy before stock runs out.'
        sender_email = settings.DEFAULT_FROM_EMAIL
        recipient_email = ['sajanluitel123@gmail.com']  # Update with your recipient email
        send_mail(subject, message, sender_email, recipient_email, fail_silently=False)

    def check_popular_items(self, items_sold):
        for item_name, num_sold in items_sold.items():
            if num_sold > 3:
                self.send_popular_item_email(item_name)