from rest_framework import serializers
from .models import Category, Place, Review, Favorite
from django.db.models import Avg

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    place_details = serializers.SerializerMethodField()

    class Meta:
        model = Favorite
        fields = ['id', 'place', 'place_details', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_place_details(self, obj):
        return {
            'id': obj.place.id,
            'title_en': obj.place.title_en,
            'title_ar': obj.place.title_ar,
            'slug': obj.place.slug,
            'image1': obj.place.image1.url if obj.place.image1 else None,
            'category_name_en': obj.place.category.name_en,
            'category_name_ar': obj.place.category.name_ar,
            'price': obj.place.price,
            'opening_hours': obj.place.opening_hours,
            'latitude': obj.place.latitude,
            'longitude': obj.place.longitude,
        }

class ReviewSerializer(serializers.ModelSerializer):
    user_full_name = serializers.ReadOnlyField(source='user.full_name')
    place_slug = serializers.ReadOnlyField(source='place.slug')
    place_title_en = serializers.ReadOnlyField(source='place.title_en')
    place_title_ar = serializers.ReadOnlyField(source='place.title_ar')

    # NEW: extra place details for professional profile reviews
    place_image = serializers.SerializerMethodField()
    place_category_en = serializers.ReadOnlyField(source='place.category.name_en')
    place_category_ar = serializers.ReadOnlyField(source='place.category.name_ar')

    class Meta:
        model = Review
        fields = [
            'id',
            'place',
            'place_slug',
            'place_title_en',
            'place_title_ar',
            'place_image',
            'place_category_en',
            'place_category_ar',
            'user',
            'user_full_name',
            'rating',
            'comment',
            'created_at'
        ]
        read_only_fields = ['user']

    def get_place_image(self, obj):
        request = self.context.get('request')

        if obj.place.image1:
            image_url = obj.place.image1.url
            if request:
                return request.build_absolute_uri(image_url)
            return image_url

        return None

class PlaceSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name_en')
    category_name_en = serializers.ReadOnlyField(source='category.name_en')
    category_name_ar = serializers.ReadOnlyField(source='category.name_ar')
    category_slug = serializers.ReadOnlyField(source='category.slug')
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = [
            'id', 'category', 'category_name', 'category_name_en', 'category_name_ar', 'category_slug',
            'title_en', 'title_ar',
            'subtitle_en', 'subtitle_ar',
            'description_en', 'description_ar',
            'image1', 'image2', 'image3', 'image4',
            'price', 'opening_hours', 'phone_number',
            'latitude', 'longitude',
            'slug', 'average_rating', 'reviews', 'is_favorite'
        ]

    def get_average_rating(self, obj):
        return obj.reviews.aggregate(Avg('rating'))['rating__avg'] or 0

    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, place=obj).exists()
        return False