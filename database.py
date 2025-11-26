from typing import Text
from peewee import *

db = SqliteDatabase('agendaContactos.db')

class Contacto(Model):
    nombre = CharField(max_length=50)
    correo = CharField(max_length=100)
    telefono = CharField(max_length=20)

    class Meta:
        database = db
        table_name = 'contactos'

db.connect()

def CargarContactos():
    contactos = []
    for cont in Contacto.select():
        contacto_dict = {
            'id': cont.id,
            'nombre': cont.nombre,
            'correo': cont.correo,
            'telefono': cont.telefono
        }
        contactos.append(contacto_dict)

    return contactos