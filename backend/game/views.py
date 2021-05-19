from django.shortcuts import render

from .models import Quiz, Map
from rest_framework import viewsets, permissions
from .serializers import QuizSerializer, MapSerializer


# Quiz viewset
class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = QuizSerializer
