from pydantic import *

class ContactoRequestModel(BaseModel):
    nombre: str
    correo: str
    telefono: str

class ContactoResponseModel(ContactoRequestModel):
    id: int
