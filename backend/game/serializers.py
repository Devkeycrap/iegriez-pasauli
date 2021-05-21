from django.db.models import fields
from rest_framework import serializers

from .models import Quiz, MapIcon


# Quiz serializer
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


# Map serializer
class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapIcon
        fields = '__all__'
