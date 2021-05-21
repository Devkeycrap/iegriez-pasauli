from django.shortcuts import render

from .models import Quiz, MapIcon
from rest_framework import viewsets, permissions, mixins
from .serializers import QuizSerializer, MapSerializer


# Quiz viewset
