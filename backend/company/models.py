from django.db import models

class Company(models.Model):
    name = models.CharField(max_length = 255)
    address = models.CharField(max_length =255)
    contact = models.IntegerField()
    reg_num = models.IntegerField(unique=True)
    # logo = models.ImageField()

    def __str__(self):
        return self.name