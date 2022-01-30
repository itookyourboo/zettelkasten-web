from django.contrib import admin
from .models import User, Kasten, Zettel, Tag


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(Kasten)
class KastenAdmin(admin.ModelAdmin):
    pass


@admin.register(Zettel)
class ZettelAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
