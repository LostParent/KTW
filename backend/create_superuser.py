import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_core.settings')
django.setup()

User = get_user_model()

username = os.environ.get('DJANGO_SUPERUSER_EMAIL')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
full_name = os.environ.get('DJANGO_SUPERUSER_FULL_NAME', 'Admin User')

if email and password:
    if not User.objects.filter(email=email).exists():
        print(f"Creating superuser for {email}...")
        User.objects.create_superuser(email=email, password=password, full_name=full_name)
    else:
        print(f"Superuser {email} already exists.")
else:
    print("Superuser credentials not provided in environment variables.")
