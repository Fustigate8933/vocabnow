from rest_framework import status
from .serializers import *
from .models import *
from dotenv import load_dotenv, find_dotenv
import os
from pymongo import MongoClient
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bson.objectid import ObjectId

# Create your views here.
def get_words(request):
    load_dotenv(find_dotenv())
    password = os.environ.get("MONGODB_PWD")
    connection_string = f"mongodb+srv://Fustigate8933:{password}@cluster0.7kfxy.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(connection_string, connect=False, serverSelectionTimeoutMS=1000000, connectTimeoutMS=None, socketTimeoutMS=None)
    word_db = client.Word
    words = word_db.Word
    def get_all_words():
        wds = words.find()
        ans = {
            "words": [],
            "definitions": [],
            "poses": []
        }
        for w in wds:
            for i in w:
                if i != "_id":
                    if i == "word":
                        ans["words"].append(f"{i}: {w[i]}")
                    elif i == "definition":
                        ans["definitions"].append(f"{i}: {w[i]}")
                    else:
                        ans["poses"].append(f"{i}: {w[i]}")
        ans["words"].reverse()
        ans["definitions"].reverse()
        ans["poses"].reverse()
        return ans
    wds = get_all_words()
    return JsonResponse({"info": wds})

@api_view(["POST"])
def add_word(request):
    serializer = WordSerializer(data=request.data)
    if serializer.is_valid():
        word = serializer.data.get('word')
        definition = serializer.data.get("definition")
        part_of_speech = serializer.data.get("part_of_speech")
        load_dotenv(find_dotenv())
        password = os.environ.get("MONGODB_PWD")
        connection_string = f"mongodb+srv://Fustigate8933:{password}@cluster0.7kfxy.mongodb.net/?retryWrites=true&w=majority"
        client = MongoClient(connection_string, connect=False, serverSelectionTimeoutMS=1000000, connectTimeoutMS=None, socketTimeoutMS=None)
        word_db = client.Word
        def insert_word(wrd, dfn, pos):
            collection = word_db.Word
            word = {
                "word": wrd,
                "definition": dfn,
                "part of speech": pos
            }
            collection.insert_one(word).inserted_id
        insert_word(word, definition, part_of_speech)
        return Response({"success": "word added sccessfully"}, status=status.HTTP_200_OK)
    return Response({"fail": "word added unsuccessfully"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_word(request):
    if request.method == 'DELETE':
        serializer = DeleteWordSerializer(data=request.data)
        if serializer.is_valid():
            word = serializer.data.get('word')
            print(word)
            word = word[6:]
            load_dotenv(find_dotenv())
            password = os.environ.get("MONGODB_PWD")
            connection_string = f"mongodb+srv://Fustigate8933:{password}@cluster0.7kfxy.mongodb.net/?retryWrites=true&w=majority"
            client = MongoClient(connection_string, connect=False, serverSelectionTimeoutMS=1000000, connectTimeoutMS=None, socketTimeoutMS=None)
            word_db = client.Word
            words = word_db.Word
            def del_wd(wd_id):
                _id = ObjectId(wd_id)
                words.delete_one({"_id": _id})
            wds = words.find()
            for w in wds:
                if w["word"] == word:
                    del_wd(w["_id"])
                    break
            return Response({"success": "word deleted sccessfully"}, status=status.HTTP_200_OK)
        return Response({"fail": "word deleted unsuccessfully"}, status=status.HTTP_400_BAD_REQUEST)
