import base64
from django.db import models


class Route(models.Model):

    def set_data(self, data):
        self._data = base64.encodebytes(data)

    def get_data(self):
        return base64.decodebytes(self._data)

    data = property(get_data, set_data)

    name = models.CharField('Name', max_length=150)
    _data = models.TextField('Data', db_column='data', blank=True)
    description = models.TextField('Description', blank=True)
