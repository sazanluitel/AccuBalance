from rest_framework import serializers
from sales.models import Sales

class SalesAddSerializers(serializers.ModelSerializer):
    customer = serializers.CharField(max_length=100)
    items_name = serializers.CharField(max_length=100)
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
    amt_received = serializers.IntegerField()

    # Marking as readonly
    tax = serializers.IntegerField(read_only=True)
    grand_total = serializers.IntegerField(read_only=True)
    receivable_amt = serializers.IntegerField(read_only=True)
    profit_loss = serializers.IntegerField(read_only=True)


    class Meta:
        model = Sales
        fields = ('customer', 'items_name', 'quantity', 'price','total_price', 'amt_received', 'tax', 'grand_total', 'receivable_amt','profit_loss')

    def create(self, validated_data):
       
        total_price = validated_data['quantity'] * validated_data['price']
        tax = 0.13 * total_price
        grand_total = total_price + tax

  
        validated_data['total_price'] = total_price
        validated_data['tax'] = tax
        validated_data['grand_total'] = grand_total


        if validated_data['amt_received'] < grand_total:
            validated_data['receivable_amt'] = grand_total - validated_data['amt_received']

    
        return super().create(validated_data)