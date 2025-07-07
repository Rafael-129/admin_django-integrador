from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView
from agricultura.views import (
    UsuariosViewSet,
    CultivoViewSet,
    TiposTerrenoViewSet,
    RecomendacionesViewSet,
)

router = routers.DefaultRouter()
router.register(r'usuarios', UsuariosViewSet)
router.register(r'cultivos', CultivoViewSet)
router.register(r'tipos-terreno', TiposTerrenoViewSet)
router.register(r'recomendaciones', RecomendacionesViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]

