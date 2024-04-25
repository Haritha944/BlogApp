from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class UserRegSerializer(serializers.Serializer):
    username=serializers.CharField(max_length=100)
    password= serializers.CharField(max_length=100,write_only=True)

    def create(self,validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            passsword= validated_data['password']
        )
        return user