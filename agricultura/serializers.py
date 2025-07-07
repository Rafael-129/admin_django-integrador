from rest_framework import serializers
from .models import Usuarios, Cultivo, TiposTerreno, Recomendaciones

class TiposTerrenoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TiposTerreno
        fields = '__all__'

class CultivoSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Cultivo
        tipo_terreno = serializers.PrimaryKeyRelatedField(queryset=TiposTerreno.objects.all())  # type: ignore
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['tipo_terreno'] = TiposTerrenoSerializer(instance.tipo_terreno).data if instance.tipo_terreno else None
        return rep

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class RecomendacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recomendaciones
        fields = '__all__'

