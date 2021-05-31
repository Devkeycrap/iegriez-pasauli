from django.db.models import fields
from rest_framework import serializers

from .models import Quiz, MapIcon, QuizQuestion


# Quiz serializer
class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ('pk', 'quiz_fk', 'question')


class QuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ('pk', 'quiz_fk', 'expected_answer')

# Map serializer
class MapIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapIcon
        fields = '__all__'


class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapIcon
        fields = '__all__'
