from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import NotFound, ValidationError
from django.db import models
from django.shortcuts import get_object_or_404
from sales.models import Sales
from stocks.models import Stock
from sales.serializers import SalesAddSerializers
from django.core.mail import send_mail
from django.conf import settings


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
        if num_of_sells > 5:
            self.send_email_notification()
        stats = {
            "num_of_sells": num_of_sells,
            "total_sales_amount": Sales.total_sales_amount(),
            "total_receivable_amt": Sales.total_receivable_amt(),
            "total_tax_amount": Sales.total_tax_amount(),
        }
        return Response(stats, status=status.HTTP_200_OK)

    def send_email_notification(self):
        subject = 'Sales Notification'
        # Calculate total quantity sold for each item
        sales_data = Sales.objects.values('items_name').annotate(total_quantity=models.Sum('quantity'))
        # Sort items by total quantity sold in descending order
        sorted_sales_data = sorted(sales_data, key=lambda x: x['total_quantity'], reverse=True)
        # Get the most popular item
        if sorted_sales_data:
            most_popular_item = sorted_sales_data[0]['items_name']
            message = f"The item {most_popular_item} is going viral now. Please buy before the stock runs out!"
            # Send email notification
            from_email = settings.EMAIL_HOST_USER
            recipient_list = ['a@example.com', 'b@example.com', 'c@example.com']
            send_mail(subject, message, from_email, recipient_list)


class SalesListView(ListAPIView):
    queryset = Sales.objects.all()
    serializer_class = SalesAddSerializers
