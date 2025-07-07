from rest_framework import serializers
from .models import Usuarios, Cultivo, TiposTerreno, Recomendaciones

class TiposTerrenoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TiposTerreno
        fields = '__all__'

class CultivoSerializer(serializers.ModelSerializer):
    tipo_terreno = TiposTerrenoSerializer(read_only=True)

    class Meta:
        model = Cultivo
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class RecomendacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recomendaciones
        fields = '__all__'

