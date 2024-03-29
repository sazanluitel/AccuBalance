from rest_framework import serializers
from company.models import Company


class CompanyRegistrationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length = 255)
    address = serializers.CharField(max_length =255)
    contact = serializers.IntegerField()
    reg_num = serializers.IntegerField()
    # logo = serializers.ImageField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'address', 'contact', 'reg_num')

class CompanyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'address', 'contact', 'reg_num')
