from django.urls import path
from .views import *

urlpatterns = [
    path("get-words", get_words),
    path("add-word", add_word),
    path("delete-word", delete_word)
]
