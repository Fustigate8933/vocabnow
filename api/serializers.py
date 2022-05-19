from rest_framework import serializers
from .models import Word

class WordSerializer(serializers.ModelSerializer):
	class Meta:
		model = Word
		fields = "__all__"

class DeleteWordSerializer(serializers.ModelSerializer):
	class Meta:
		model = Word
		fields = ("word", )
