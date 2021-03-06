# Generated by Django 4.0.1 on 2022-01-30 13:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='kasten',
            name='is_root',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='kasten',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='kastens', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='kasten',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='children_kastens', to='api.kasten'),
        ),
        migrations.AlterField(
            model_name='zettel',
            name='kasten',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='children_zettels', to='api.kasten'),
        ),
        migrations.AlterField(
            model_name='zettel',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='zettels', to=settings.AUTH_USER_MODEL),
        ),
    ]
