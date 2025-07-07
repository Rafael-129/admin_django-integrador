from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuarios, Cultivo, TiposTerreno, Recomendaciones
from .serializers import (
    UsuariosSerializer, CultivoSerializer, TiposTerrenoSerializer, RecomendacionesSerializer
)

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


