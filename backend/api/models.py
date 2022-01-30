import jwt

from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.contrib.auth.models import PermissionsMixin
from django.core import validators
from django.db import models


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(
        validators=[validators.validate_email],
        unique=True,
        blank=False
    )

    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', )

    objects = UserManager()

    def __str__(self):
        return self.username

    @property
    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token


class Tag(models.Model):
    label = models.CharField(max_length=100, unique=True)


class Kasten(models.Model):
    title = models.CharField(max_length=200)
    is_root = models.BooleanField(default=False)
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name='children_kastens',
        null=True
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='kastens'
    )


class Zettel(models.Model):
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=2500)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    related = models.ManyToManyField("self", symmetrical=True)
    tags = models.ManyToManyField(Tag)
    kasten = models.ForeignKey(
        Kasten,
        on_delete=models.CASCADE,
        related_name='children_zettels'
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='zettels'
    )

