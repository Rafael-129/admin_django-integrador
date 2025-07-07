from django.contrib import admin
from .models import Usuarios, Cultivo, TiposTerreno, Recomendaciones

admin.site.register(Usuarios)
admin.site.register(Cultivo)
admin.site.register(TiposTerreno)
admin.site.register(Recomendaciones)

