from django.contrib import admin
from .models import Cosecha, Cultivos, Pregunta, RegistroFertilizacion, Sembrio, TipoSuelo, Usuario, Usuarios

class PreguntaAdmin(admin.ModelAdmin):
    list_display = ('pk_pregunta', 'pregunta', 'respuesta', 'fk_usuario')
    search_fields = ('pregunta', 'respuesta')
    list_filter = ('fk_usuario',)

# Register your models here.
admin.site.register(Cosecha)
admin.site.register(Cultivos)
admin.site.register(Pregunta, PreguntaAdmin)
admin.site.register(RegistroFertilizacion)
admin.site.register(Sembrio)
admin.site.register(TipoSuelo)
admin.site.register(Usuario)
admin.site.register(Usuarios)