from django.db import models

# Create your models here.
class Word(models.Model):
    word = models.TextField(unique=True, blank=False)
    definition = models.TextField(unique=False, blank=False)
    part_of_speech = models.TextField(blank=True)
