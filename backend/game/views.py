from .models import GameItem, MapAnswer, MapQuestion, QuizQuestion
from rest_framework import viewsets
from .serializers import GameItemSerializer, MapAnswerValidationSerializer, MapQuestionSerializer, QuizQuestionSerializer, QuizAnswerValidationSerializer

# Game item viewset


class GameItemViewSet(viewsets.ModelViewSet):
    model = GameItem
    serializer_class = GameItemSerializer
    queryset = GameItem.objects.all()


# Quiz viewsets
class QuizQuestionViewSet(viewsets.ModelViewSet):
    model = QuizQuestion
    serializer_class = QuizQuestionSerializer

    def get_queryset(self):
        return QuizQuestion.objects.filter(
            game_item_fk__name=self.request.query_params.get('item'))


class QuizAnswerValidationViewSet(viewsets.ModelViewSet):
    model = QuizQuestion
    serializer_class = QuizAnswerValidationSerializer

    def get_queryset(self):
        return QuizQuestion.objects.filter(
            id=self.request.query_params.get('id')
        )


# Map viewsets
class MapQuestionViewSet(viewsets.ModelViewSet):
    model = MapQuestion
    serializer_class = MapQuestionSerializer

    def get_queryset(self):
        return MapQuestion.objects.filter(game_item_fk__name=self.request.query_params.get('item'))


class MapAnswerValidationViewSet(viewsets.ModelViewSet):
    model = MapAnswer
    serializer_class = MapAnswerValidationSerializer

    def get_queryset(self):
        return MapAnswer.objects.filter(id=self.request.query_params.get('id'))
