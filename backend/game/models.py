from django.db import models


# Overall models
class GameItem(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self) -> str:
        return str(self.name)


# Quiz models
class Quiz(models.Model):
    game_item_fk = models.ForeignKey(
        GameItem, verbose_name='Game item', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.game_item_fk)

    class Meta:
        verbose_name = 'Quiz'
        verbose_name_plural = 'Quizes'


class QuizQuestion(models.Model):
    quiz_fk = models.ForeignKey(
        Quiz, verbose_name='Quiz', on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    expected_answer = models.BooleanField(verbose_name='True')

    def __str__(self) -> str:
        return str(self.id)


# Map models
class MapIcon(models.Model):
    game_item_fk = models.ForeignKey(
        GameItem, verbose_name='Game item', on_delete=models.CASCADE)
    icon_name = models.CharField(max_length=20)

    def __str__(self) -> str:
        return str(self.icon_name)


class MapIconQuestion(models.Model):
    map_icon_fk = models.ForeignKey(
        MapIcon, verbose_name='Icon', on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    answer_message = models.CharField(max_length=300)
    correct_answer = models.CharField(max_length=300)
    incorrect_answer = models.CharField(max_length=300)

    def __str__(self) -> str:
        return str(self.id)
