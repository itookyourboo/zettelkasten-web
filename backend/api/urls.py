from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter

from .views import (
    RegistrationAPIView,
    LoginAPIView,
    KastenViewSet
)


router = DefaultRouter()
router.register(r'kastens', KastenViewSet, basename='kastens')

urlpatterns = [
    re_path(r'^registration/?$', RegistrationAPIView.as_view(), name='user_registration'),
    re_path(r'^login/?$', LoginAPIView.as_view(), name='user_login'),
    path('', include(router.urls))
]
