from django.db import models

class Purchase(models.Model):
    vendor = models.CharField(max_length=100)
    items_name = models.CharField(max_length= 100)
    quantity = models.IntegerField()
    price = models.IntegerField()
    total_price = models.IntegerField()
    amt_paid = models.IntegerField()
    tax = models.IntegerField()
    grand_total = models.IntegerField()
    payable_amt = models.IntegerField(default =0)

    def __str__(self):
        return self.items_name


