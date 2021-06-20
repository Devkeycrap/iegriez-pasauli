from django.db import models
from django.utils.functional import empty


# Overall models
class GameItem(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self) -> str:
        return str(self.name)


# Quiz models
class QuizQuestion(models.Model):
    game_item_fk = models.ForeignKey(
        GameItem, verbose_name='Game item', on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    is_correct = models.BooleanField(verbose_name='True')

    def __str__(self) -> str:
        return str(self.game_item_fk)


# Map models
class MapQuestion(models.Model):
    game_item_fk = models.ForeignKey(
        GameItem, verbose_name='Game item', on_delete=models.CASCADE)
    statement = models.CharField(max_length=300)
    answers = models.ManyToManyField('MapAnswer')

    def __str__(self) -> str:
        return 'Question'


class MapAnswer(models.Model):
    answer = models.CharField(max_length=300)
    answer_message = models.CharField(max_length=300)
    is_correct = models.BooleanField()

    def __str__(self) -> str:
        return 'Answer'
