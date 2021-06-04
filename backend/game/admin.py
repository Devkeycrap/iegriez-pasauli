from django.contrib import admin
from .models import Quiz, GameItem, MapQuestion, QuizQuestion, MapAnswer


class QuizQuestionAdmin(admin.StackedInline):
    model = QuizQuestion
    verbose_name = 'Question'
    fields = ('quiz_fk', 'question', 'expected_answer')


class MapQuestionAdmin(admin.StackedInline):
    model = MapQuestion
    fields = ('question', 'answer_message')


@admin.register(GameItem)
class ItemAdmin(admin.ModelAdmin):
    fields = ('name',)
    list_display = ('name',)


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    inlines = [QuizQuestionAdmin]
    list_display = ('game_item_fk',)


@admin.register(MapQuestion)
class MapQuestionAdmin(admin.ModelAdmin):
    # inlines = [MapAnswerAdmin]
    list_display = ('game_item_fk',)


@admin.register(MapAnswer)
class MapAnswerAdmin(admin.ModelAdmin):
    list_display = ('answer',)
