from rest_framework import serializers
from purchase.models import Purchase

class PurchaseAddSerializers(serializers.ModelSerializer):
    vendor = serializers.CharField(max_length=100)
    items_name = serializers.CharField(max_length=100)
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
    total_price = serializers.IntegerField(default=0)
    amt_paid = serializers.IntegerField()

   
    tax = serializers.IntegerField(read_only=True)
    grand_total = serializers.IntegerField(read_only=True)
    payable_amt = serializers.IntegerField(read_only=True)

    class Meta:
        model = Purchase
        fields = ('vendor', 'items_name', 'quantity', 'price', 'total_price', 'amt_paid', 'tax', 'grand_total', 'payable_amt')

    def create(self, validated_data):
        
        total_price = validated_data['quantity'] * validated_data['price']
        tax = 0.13 * total_price
        grand_total = total_price + tax

        
        validated_data['total_price'] = total_price
        validated_data['tax'] = tax
        validated_data['grand_total'] = grand_total

        
        if validated_data['amt_paid'] < grand_total:
            validated_data['payable_amt'] = grand_total - validated_data['amt_paid']

       
        return super().create(validated_data)