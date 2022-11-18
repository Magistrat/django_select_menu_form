from django.db import models
from django.urls import reverse

class Task(models.Model):
    request = models.TextField(verbose_name='request_query', blank=True)
    additionals = models.CharField(max_length=200, blank=True, verbose_name='additional_services')

    def delete_url(self):
        return reverse('delete-model', kwargs={'pk': self.id})
