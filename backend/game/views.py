from django.shortcuts import render

from .models import Quiz, Map
from rest_framework import viewsets, permissions, mixins
from .serializers import QuizSerializer, MapSerializer


# Quiz viewset
class QuizViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.ListModelMixin):
    queryset = Quiz.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = QuizSerializer
