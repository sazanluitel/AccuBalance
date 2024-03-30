from django.urls import path, include
from account.views import (
UserRegistrationView,
UserLoginView, 
UserProfileView, 
PasswordChangeView, 
PasswordResetView,
ResetPasswordUpdateView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name = 'register' ),
    path('login/', UserLoginView.as_view(), name = 'login'),
    path('profile/', UserProfileView.as_view(), name = 'profile'),
    path('changepassword/', PasswordChangeView.as_view(), name = 'changepassword'),
    path('passwordreset/', PasswordResetView.as_view(), name = 'passwordreset'),
    path('reset/<uid>/<token>/', ResetPasswordUpdateView.as_view(),name = 'reset')
]