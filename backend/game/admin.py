from django.contrib import admin
from .models import GameItem, MapQuestion, QuizQuestion, MapAnswer


class QuizQuestionAdmin(admin.StackedInline):
    model = QuizQuestion
    verbose_name = 'Question'
    fields = ('quiz_fk', 'question', 'expected_answer')


@admin.register(GameItem)
class ItemAdmin(admin.ModelAdmin):
    fields = ('name',)
    list_display = ('name',)


@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('game_item_fk', 'question')
    fields = ('game_item_fk', 'question', 'is_correct')


@admin.register(MapQuestion)
class MapQuestionAdmin(admin.ModelAdmin):
    # inlines = [MapAnswerAdmin]
    list_display = ('game_item_fk', 'statement')
    fields = ('game_item_fk', 'statement', 'answers')


@admin.register(MapAnswer)
class MapQuestionAnswerAdmin(admin.ModelAdmin):
    list_display = ('answer',)
