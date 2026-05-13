from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, PlaceViewSet, ReviewViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('', include(router.urls)),
]
