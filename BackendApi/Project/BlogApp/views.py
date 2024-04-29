from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


# Create your views here.
@api_view(['GET'])
def home(request):
    posts=Post.objects.all()
    serialize = PostSerializer(posts,many=True)
    return Response(serialize.data)

@api_view(['GET'])
def postdetails(request,pk):
    post = Post.objects.get(pk=pk)
    serialize = PostSerializer(post)
    return Response(serialize.data)

@api_view(['GET'])
def category(request):
    cat = Category.objects.all()
    serialize = CategorySerializer(cat,many=True)
    return Response(serialize.data)
    
@api_view(['GET'])
def users(request):
    user=User.objects.all()
    serialize = UserSerializer(user,many=True)
    return Response(serialize.data)

@api_view(['POST'])
def user_registration(request):
    serializer=UserRegSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)