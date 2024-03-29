from django.urls import path, include
from company.views import CompanyRegistrationView, CompanyView

urlpatterns = [
    path('register/', CompanyRegistrationView.as_view(), name='company_register'),
    path('companylist/', CompanyView.as_view(), name='company_list'),
]