from django.contrib import admin
from .models import Quiz, MapIcon, GameItem, MapIconQuestion, QuizQuestion


class QuizQuestionAdmin(admin.StackedInline):
    model = QuizQuestion
    verbose_name = 'Question'
    fields = ('quiz_fk', 'question', 'expected_answer')


class MapQuestionAdmin(admin.StackedInline):
    model = MapIconQuestion
    fields = ('map_icon_fk', 'question', 'answer_message',
              'correct_answer', 'incorrect_answer')


@admin.register(GameItem)
class ItemAdmin(admin.ModelAdmin):
    fields = ('name',)
    list_display = ('name',)


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    inlines = [QuizQuestionAdmin]
    list_display = ('game_item_fk',)


@admin.register(MapIcon)
class MapIconAdmin(admin.ModelAdmin):
    inlines = [MapQuestionAdmin]
    list_display = ('game_item_fk', 'image')
