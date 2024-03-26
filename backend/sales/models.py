from django.db import models

class Sales(models.Model):
    customer = models.CharField(max_length=100)
    items_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.IntegerField()
    total_price = models.IntegerField(default=0)
    amt_received = models.IntegerField()
    tax = models.IntegerField(default=0)
    grand_total = models.IntegerField(default=0)
    receivable_amt = models.IntegerField(default=0)
    profit_loss = models.IntegerField(default=0)

    @classmethod
    def num_of_sells(cls):
        return cls.objects.count()

    @classmethod
    def total_sales_amount(cls):
        return cls.objects.aggregate(total_price=models.Sum('total_price'))['total_price'] or 0

    @classmethod
    def total_receivable_amt(cls):
        return cls.objects.aggregate(total_receivable_amt=models.Sum('receivable_amt'))['total_receivable_amt'] or 0

    @classmethod
    def total_tax_amount(cls):
        return cls.objects.aggregate(total_tax=models.Sum('tax'))['total_tax'] or 0

    def __str__(self):
        return self.items_name
