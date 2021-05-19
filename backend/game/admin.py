from django.contrib import admin
from .models import Quiz, Map, WheelOfFortuneItem, MapQuestion, MapQuestionAnswer

# Quiz admin


@admin.register(WheelOfFortuneItem)
class WheelOfFortuneItemAdmin(admin.ModelAdmin):
    fields = ('name',)
    list_display = ('name',)


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    fields = ('wheel_fk', 'question', 'expected_answer')
    list_display = ('question', 'expected_answer')


@admin.register(Map)
class MapAdmin(admin.ModelAdmin):
    fields = ('wheel_fk', 'icon_name')
    list_display = ('icon_name',)


@admin.register(MapQuestion)
class MapQuestionAdmin(admin.ModelAdmin):
    fields = ('map_fk', 'question', 'answer_message', 'correct_answer')
    list_display = ('map_fk', 'question', 'answer_message', 'correct_answer')


@admin.register(MapQuestionAnswer)
class MapQuestionAnswerAdmin(admin.ModelAdmin):
    fields = ('map_question_fk', 'answer')
    list_display = ('map_question_fk', 'answer')
