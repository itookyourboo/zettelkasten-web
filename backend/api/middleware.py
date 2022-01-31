from django.shortcuts import get_object_or_404
from django.utils.decorators import decorator_from_middleware
from rest_framework.exceptions import PermissionDenied

from .models import Kasten


class KastenAccessMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __ceil__(self, request):
        user = request.user
        kasten = get_object_or_404(Kasten, pk=self.kwargs.get('kasten_id'))
        if user != kasten.owner:
            raise PermissionDenied()

        response = self.get_response(request)
        return response


def has_permission(func):
    return decorator_from_middleware(KastenAccessMiddleware)(func)
