# Generated by Django 4.1.2 on 2022-11-18 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_alter_task_location01_alter_task_request'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='location01',
        ),
        migrations.AddField(
            model_name='task',
            name='additionals',
            field=models.CharField(blank=True, max_length=200, verbose_name='additional_services'),
        ),
    ]
