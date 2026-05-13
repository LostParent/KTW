from django.contrib import admin
from .models import Category, Place, Review

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_ar', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'category', 'price', 'opening_hours', 'latitude', 'longitude', 'slug')
    list_filter = ('category',)
    search_fields = ('title_en', 'title_ar', 'subtitle_en', 'subtitle_ar', 'description_en', 'description_ar')
    prepopulated_fields = {'slug': ('title_en',)}

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('place', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
