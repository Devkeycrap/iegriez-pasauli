from django.shortcuts import render

from .models import Quiz, MapIcon, QuizQuestion
from rest_framework import viewsets, permissions, mixins, generics
from .serializers import QuizQuestionSerializer, QuizAnswerSerializer


# Quiz viewset
class QuizQuestionViewSet(viewsets.ModelViewSet):
    model = QuizQuestion
    serializer_class = QuizQuestionSerializer

    def get_queryset(self):
        game_obj = self.request.query_params.get('object')
        question_id = self.request.query_params.get('id')
        queryset = QuizQuestion.objects.all()

        if game_obj:
            queryset = queryset.filter(
                quiz_fk__game_item_fk__name=game_obj, pk=question_id
            )
            print("Couldn't find any objects")

        return queryset


class QuizAnswerViewSet(viewsets.ModelViewSet):
    model = QuizQuestion
    serializer_class = QuizAnswerSerializer

    def get_queryset(self):
class MapIconViewSet(viewsets.ModelViewSet):
    model = MapIcon
    serializer_class = MapIconSerializer
    queryset = MapIcon.objects.all()


        return queryset
