from django.shortcuts import render
from .models import Company
from company.serializers import CompanyRegistrationSerializer, CompanyListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class CompanyRegistrationView(APIView):
    def post(self, request):
        serializer = CompanyRegistrationSerializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            reg_num = serializer.validated_data.get('reg_num')

            if reg_num is not None:
                # Check if a company with the same registration number already exists
                if Company.objects.filter(reg_num=reg_num).exists():
                    return Response({'msg': 'Company already exists, Please add new registration num'})
                
            # Save the company
            serializer.save()
            return Response({'msg': 'Company added successfully'})

        except serializers.ValidationError as e:
            return Response({'errors': e.detail}, status=status.HTTP_400_BAD_REQUEST)




class CompanyView(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanyListSerializer(companies, many=True)
        return Response(serializer.data)
