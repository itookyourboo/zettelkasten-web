# Generated by Django 4.0.1 on 2022-01-30 14:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_kasten_is_root_alter_kasten_owner_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kasten',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children_kastens', to='api.kasten'),
        ),
    ]
