from rest_framework import serializers
from .models import Cultivos

class CultivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivos
        fields = '__all__'
