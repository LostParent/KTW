from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    SignupView,
    MeView,
    LoginView,
    ChangePasswordView,
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),

    # ✅ NEW - Change Password
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
]