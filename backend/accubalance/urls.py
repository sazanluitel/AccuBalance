from django.contrib import admin
from django.urls import path, include, re_path

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="AccuBalancae API DOCS",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="hhh@hh.com"),
      license=openapi.License(name="GNU License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('dashboard.urls')),
    path('api/user/', include('account.urls')),
    path('api/company/', include('company.urls')),
    path('api/purchase/', include('purchase.urls')),
    path('api/sales/', include('sales.urls')),
    path('api/stocks/', include('stocks.urls')),
    path('api/reports/', include('reports.urls')),

    # Swagger docs
   path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
