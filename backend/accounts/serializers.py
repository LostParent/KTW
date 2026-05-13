from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        if 'email' in attrs and 'username' not in attrs:
            attrs['username'] = attrs['email']
        return super().validate(attrs)


class UserSerializer(serializers.ModelSerializer):
    reviews_count = serializers.SerializerMethodField()
    favorites_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'full_name',
            'profile_picture',
            'language_preference',
            'date_joined',
            'reviews_count',
            'favorites_count',
        )
        read_only_fields = (
            'id',
            'date_joined',
            'reviews_count',
            'favorites_count',
        )

    def get_reviews_count(self, obj):
        return obj.review_set.count()

    def get_favorites_count(self, obj):
        return obj.favorites.count()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'email',
            'full_name',
            'password',
            'confirm_password',
        )

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'password': 'Passwords do not match.'
            })
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')

        user = User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password'],
        )

        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_new_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError({
                'new_password': 'New passwords do not match.'
            })

        return data

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise serializers.ValidationError('Old password is incorrect.')

        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user