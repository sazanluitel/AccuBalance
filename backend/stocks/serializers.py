from stocks.models import Stock
from rest_framework import serializers
from django.core.validators import MinValueValidator


class StockAddSerializers(serializers.ModelSerializer):
    items_name = serializers.CharField(max_length=100)
    quantity = serializers.IntegerField(validators=[MinValueValidator(0)])
    price = serializers.IntegerField(validators=[MinValueValidator(0)])
   
    class Meta:

        model = Stock
        fields = ('items_name', 'quantity', 'price' )