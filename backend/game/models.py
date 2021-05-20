from django.db import models

# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=20)


class Quiz(models.Model):
    wheel_fk = models.ForeignKey(Item, on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    expected_answer = models.BooleanField()


class Map(models.Model):
    wheel_fk = models.ForeignKey(Item, on_delete=models.CASCADE)
    icon_name = models.CharField(max_length=20)


class MapQuestion(models.Model):
    map_fk = models.ForeignKey(Map, on_delete=models.CASCADE)
    question = models.CharField(max_length=300)
    answer_message = models.CharField(max_length=300)
    correct_answer = models.ForeignKey(
        "MapQuestionAnswer", on_delete=models.CASCADE
    )


class MapQuestionAnswer(models.Model):
    map_question_fk = models.ForeignKey(
        MapQuestion, on_delete=models.CASCADE, null=True, blank=True)
    answer = models.CharField(max_length=200)
