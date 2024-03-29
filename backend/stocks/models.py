from django.db import models

class Stock(models.Model):
    items_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.IntegerField(null=True)

    def __str__(self):
        return self.items_name
