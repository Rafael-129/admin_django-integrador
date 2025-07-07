from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuarios, Cultivo, TiposTerreno, Recomendaciones
from .serializers import (
    UsuariosSerializer, CultivoSerializer, TiposTerrenoSerializer, RecomendacionesSerializer
)
from rest_framework import permissions, generics
from .serializers_admin import AdminUserCreateSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.urls import reverse
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers_jwt import MyTokenObtainPairSerializer

class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class CultivoViewSet(viewsets.ModelViewSet):
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer

class TiposTerrenoViewSet(viewsets.ModelViewSet):
    queryset = TiposTerreno.objects.all()
    serializer_class = TiposTerrenoSerializer

class RecomendacionesViewSet(viewsets.ModelViewSet):
    queryset = Recomendaciones.objects.all()
    serializer_class = RecomendacionesSerializer

# Vista para crear usuarios administradores (solo superusuarios)
class AdminUserCreateView(generics.CreateAPIView):
    serializer_class = AdminUserCreateSerializer
    permission_classes = [permissions.IsAdminUser]

# API root personalizada
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'usuarios': request.build_absolute_uri('/api/usuarios/'),
        'cultivos': request.build_absolute_uri('/api/cultivos/'),
        'tipos-terreno': request.build_absolute_uri('/api/tipos-terreno/'),
        'recomendaciones': request.build_absolute_uri('/api/recomendaciones/'),
        'token': request.build_absolute_uri('/api/token/'),
        'create-admin': request.build_absolute_uri('/api/create-admin/'),
    })

# Vista personalizada para obtener token con username
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


