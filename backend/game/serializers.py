from rest_framework import serializers

from .models import GameItem, MapAnswer, MapQuestion, QuizQuestion


# Game item serializer
class GameItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameItem
        fields = '__all__'


# Quiz question serializer
class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ('id', 'question')


# Quiz answer serializer
class QuizAnswerValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ('id', 'is_correct')


class MapAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapAnswer
        fields = ('id', 'answer')


class MapAnswerValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapAnswer
        fields = ('id', 'answer', 'is_correct', 'answer_message')


class MapQuestionSerializer(serializers.ModelSerializer):
    answers = MapAnswerSerializer(read_only=True, many=True)

    class Meta:
        model = MapQuestion
        fields = ('id', 'statement', 'answers')
