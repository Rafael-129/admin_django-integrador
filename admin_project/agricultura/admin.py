from django.contrib import admin
from .models import Cosecha, Cultivos, Pregunta, RegistroFertilizacion, Sembrio, TipoSuelo, Usuario, Usuarios

# Register your models here.
admin.site.register(Cosecha)
admin.site.register(Cultivos)
admin.site.register(Pregunta)
admin.site.register(RegistroFertilizacion)
admin.site.register(Sembrio)
admin.site.register(TipoSuelo)
admin.site.register(Usuario)
admin.site.register(Usuarios)