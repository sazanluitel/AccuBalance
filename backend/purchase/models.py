from django.db import models

class Purchase(models.Model):
    vendor = models.CharField(max_length=100)
    items_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.IntegerField()
    total_price = models.IntegerField(default=0)
    amt_paid = models.IntegerField()
    tax = models.IntegerField()
    grand_total = models.IntegerField()
    payable_amt = models.IntegerField(default=0)

    @classmethod
    def num_of_purchases(cls):
        return cls.objects.count()

    @classmethod
    def total_purchase_amount(cls):
        return cls.objects.aggregate(total_amount=models.Sum('total_price'))['total_amount'] or 0

    @classmethod
    def total_payable_amount(cls):
        return cls.objects.aggregate(total_payable=models.Sum('payable_amt'))['total_payable'] or 0

    def __str__(self):
        return self.items_name
