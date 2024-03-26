from django.db import models

class Sales(models.Model):
    customer = models.CharField(max_length=100)
    items_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.IntegerField()
    total_price = models.IntegerField(default=0)
    amt_received = models.IntegerField()
    tax = models.IntegerField(default = 0)
    grand_total = models.IntegerField(default = 0)
    receivable_amt = models.IntegerField(default =0)
    total_receivable_amt = models.IntegerField(default = 0)
    # profit_loss =models.IntegerField(default=0)

    def __str__(self):
        return self.items_name
