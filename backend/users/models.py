from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50)
    points = models.IntegerField()

    def __str__(self) -> str:
        return str(self.username)
