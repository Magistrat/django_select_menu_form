# Generated by Django 4.1.2 on 2022-10-18 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='location01',
            field=models.TextField(max_length=200, verbose_name='first_location'),
        ),
        migrations.AlterField(
            model_name='task',
            name='request',
            field=models.TextField(blank=True, verbose_name='request_query'),
        ),
    ]
