from django.contrib import admin
from .models import Quiz, Map, Item, MapQuestion, MapQuestionAnswer

# Quiz admin


class QuizAdmin(admin.StackedInline):
    model = Quiz
    verbose_name = "Quiz question"
    verbose_name_plural = "Quiz questions"
    fields = ('wheel_fk', 'question', 'expected_answer')
    list_display = ('question', 'expected_answer')


class MapAdmin(admin.StackedInline):
    model = Map
    fields = ('wheel_fk', 'icon_name')
    list_display = ('icon_name',)


class MapQuestionAdmin(admin.StackedInline):
    model = MapQuestion
    fields = ('map_fk', 'question', 'answer_message', 'correct_answer')
    list_display = ('map_fk', 'question',
                    'answer_message', 'correct_answer')


@admin.register(MapQuestionAnswer)
class MapQuestionAnswerAdmin(admin.ModelAdmin):
    fields = ('map_question_fk', 'answer')
    list_display = ('map_question_fk', 'answer')


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    inlines = [QuizAdmin, MapAdmin]
    fields = ('name',)
    list_display = ('name',)
