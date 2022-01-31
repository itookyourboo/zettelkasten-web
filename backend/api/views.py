from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .backends import JWTAuthentication
from .middleware import has_permission
from .models import Kasten, Zettel
from .serializers import LoginSerializer, KastenSerializer, ZettelSerializer, KastenContentSerializer
from .serializers import RegistrationSerializer


class RegistrationAPIView(APIView):
    """
    Registers a new user.
    """
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer

    def post(self, request):
        """
        Creates a new User object.
        Username, email, and password are required.
        Returns a JSON web token.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                'token': serializer.data.get('token', None),
            },
            status=status.HTTP_201_CREATED,
        )


class LoginAPIView(APIView):
    """
    Logs in an existing user.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        """
        Checks is user exists.
        Email and password are required.
        Returns a JSON web token.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class KastenViewSet(viewsets.ModelViewSet):
    queryset = Kasten.objects.all()
    serializer_class = KastenSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return KastenContentSerializer
        return KastenSerializer

    def get_queryset(self):
        user = self.request.user
        kastens = user.kastens.all()
        return kastens

    @has_permission
    def retrieve(self, request, *args, **kwargs):
        kasten = self.get_object()
        serializer = KastenContentSerializer(kasten)
        return Response(serializer.data)

    def perform_create(self, serializer):
        user = self.request.user
        if user.kastens.count() == 0:
            root = Kasten(
                title='Zettelkasten',
                is_root=True,
                owner=user,
            )
            root.save()
        else:
            serializer.save(owner=self.request.user, is_root=False)

    @has_permission
    def perform_update(self, serializer):
        serializer.save()

    @has_permission
    def perform_destroy(self, instance):
        instance.delete()


class ZettelViewSet(viewsets.ModelViewSet):
    queryset = Zettel.objects.all()
    serializer_class = ZettelSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @has_permission
    def get_queryset(self):
        kasten = get_object_or_404(Kasten, pk=self.kwargs.get('kasten_id'))
        zettels = kasten.children_zettels.all()
        return zettels

    @has_permission
    def perform_create(self, serializer):
        user = self.request.user
        kasten = get_object_or_404(Kasten, pk=self.kwargs.get('kasten_id'))

        serializer.save(
            owner=user,
            kasten=kasten
        )

    @has_permission
    def perform_update(self, serializer):
        serializer.save()

    @has_permission
    def perform_destroy(self, instance):
        instance.delete()
