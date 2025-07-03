"""
URL configuration for admin_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from agricultura.views import (
    CultivosViewSet, CosechaViewSet, UsuariosViewSet, PreguntaViewSet,
    RegistroFertilizacionViewSet, SembrioViewSet, TipoSueloViewSet, UsuarioViewSet
)

router = routers.DefaultRouter()
router.register(r'cultivos', CultivosViewSet)
router.register(r'cosecha', CosechaViewSet)
router.register(r'usuarios', UsuariosViewSet)
router.register(r'pregunta', PreguntaViewSet)
router.register(r'registro_fertilizacion', RegistroFertilizacionViewSet)
router.register(r'sembrio', SembrioViewSet)
router.register(r'tipo_suelo', TipoSueloViewSet)
router.register(r'usuario', UsuarioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
