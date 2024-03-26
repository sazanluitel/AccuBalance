from rest_framework import serializers
from sales.models import Sales
from stocks.models import Stock

class SalesAddSerializers(serializers.ModelSerializer):
    customer = serializers.CharField(max_length=100)
    items_name = serializers.CharField(max_length=100)
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
    amt_received = serializers.IntegerField()

    # Marking as readonly
    total_price = serializers.IntegerField(read_only=True)
    tax = serializers.IntegerField(read_only=True)
    grand_total = serializers.IntegerField(read_only=True)
    receivable_amt = serializers.IntegerField(read_only=True)
    profit_loss = serializers.IntegerField(read_only=True)

    class Meta:
        model = Sales
        fields = (
            "customer",
            "items_name",
            "quantity",
            "price",
            "total_price",
            "amt_received",
            "tax",
            "grand_total",
            "receivable_amt",
            "profit_loss",
        )

    def create(self, validated_data):
        customer = validated_data['customer']
        items_name = validated_data['items_name']
        quantity = validated_data["quantity"]
        price = validated_data["price"]
        amt_received = validated_data["amt_received"]

        # Get the corresponding stock item's price
        try:
            stock_item = Stock.objects.get(items_name=validated_data["items_name"])
            stock_price = stock_item.price
        except Stock.DoesNotExist:
            raise serializers.ValidationError("Stock item does not exist.")

        # Calculate total_price
        total_price = quantity * price

        # Calculate tax (13% of total_price)
        tax = 0.13 * total_price

        # Calculate grand_total (total_price + tax)
        grand_total = total_price + tax

        # Calculate receivable_amt (grand_total - amt_received)
        receivable_amt = grand_total - amt_received

        # Calculate profit_loss (amt_received - total_price)
        profit_loss = (price - stock_price) * quantity

        # Create and return the Sales instance
        return Sales.objects.create(
            customer=customer,
            items_name=items_name,
            quantity=quantity,
            price=price,
            total_price=total_price,
            tax=tax,
            grand_total=grand_total,
            receivable_amt=receivable_amt,
            amt_received=amt_received,
            profit_loss=profit_loss,
        )
