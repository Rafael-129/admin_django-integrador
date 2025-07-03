from rest_framework import serializers
from .models import (
    Cultivos, Cosecha, Usuarios, Pregunta, RegistroFertilizacion,
    Sembrio, TipoSuelo, Usuario
)

class CultivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivos
        fields = '__all__'

class CosechaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cosecha
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = '__all__'

class RegistroFertilizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroFertilizacion
        fields = '__all__'

class SembrioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sembrio
        fields = '__all__'

class TipoSueloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoSuelo
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
