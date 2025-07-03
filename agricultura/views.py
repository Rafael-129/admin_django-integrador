from django.shortcuts import render
from rest_framework import viewsets
from .models import (
    Cultivos, Cosecha, Usuarios, Pregunta, RegistroFertilizacion,
    Sembrio, TipoSuelo, Usuario
)
from .serializers import (
    CultivosSerializer, CosechaSerializer, UsuariosSerializer,
    PreguntaSerializer, RegistroFertilizacionSerializer,
    SembrioSerializer, TipoSueloSerializer, UsuarioSerializer
)

# API REST para Cultivos
class CultivosViewSet(viewsets.ModelViewSet):
    queryset = Cultivos.objects.all()
    serializer_class = CultivosSerializer

class CosechaViewSet(viewsets.ModelViewSet):
    queryset = Cosecha.objects.all()
    serializer_class = CosechaSerializer

class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer

class RegistroFertilizacionViewSet(viewsets.ModelViewSet):
    queryset = RegistroFertilizacion.objects.all()
    serializer_class = RegistroFertilizacionSerializer

class SembrioViewSet(viewsets.ModelViewSet):
    queryset = Sembrio.objects.all()
    serializer_class = SembrioSerializer

class TipoSueloViewSet(viewsets.ModelViewSet):
    queryset = TipoSuelo.objects.all()
    serializer_class = TipoSueloSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
