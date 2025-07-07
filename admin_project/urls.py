from django.contrib import admin
from django.urls import path, include
from agricultura.views import api_root, AdminUserCreateView, MyTokenObtainPairView
from rest_framework import routers

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
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/create-admin/', AdminUserCreateView.as_view(), name='create_admin'),
    path('api/', include(router.urls)),  # Esto debe ir antes que api_root
    path('api/', api_root, name='api-root'),  # Esto SOLO debe ser para /api/
    
]