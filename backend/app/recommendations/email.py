from django.core.mail import send_mail

send_mail(
    'Test mail',  # Email subject
    'Test  mesage',  # Email message
    'app.accubalance@gmail.com',  # Sender's email address
    ['sajanluitel123@gmail.com'],  # List of recipient email addresses
    fail_silently=False,  # Set to True to suppress errors (not recommended)
)
