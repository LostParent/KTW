from rest_framework import status, generics, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model, update_session_auth_hash
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    SignupSerializer,
    UserSerializer,
    MyTokenObtainPairSerializer,
    ChangePasswordSerializer,
)

User = get_user_model()


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = SignupSerializer


class MeView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        user = request.user

        if request.data.get('remove_profile_picture') == 'true':
            if user.profile_picture:
                user.profile_picture.delete(save=False)
            user.profile_picture = None
            user.save()

        return self.partial_update(request, *args, **kwargs)


class ChangePasswordView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            user = serializer.save()
            update_session_auth_hash(request, user)

            return Response(
                {"detail": "Password changed successfully."},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)