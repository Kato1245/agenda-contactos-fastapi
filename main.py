from fastapi import FastAPI
from database import db as connection
from database import *
from schemas import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Agenda de Contactos", 
              description="API para la gestión de contactos", 
              version="1.0.0")

origins = ["*"]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

#Forma antigua de conectarse y desconectarse de la API
@app.on_event('startup')
def startup():
    if connection.is_closed():
        connection.connect()

    connection.create_tables([Contacto])

@app.on_event('shutdown')
def shutdown():
    if not connection.is_closed():
        connection.close()

#Funcion agregar
@app.post('/api/v1/agregar', tags=['Contactos'])
async def agregar_contacto(contacto_request: ContactoRequestModel):
    contactos = Contacto.create(
        nombre=contacto_request.nombre,
        correo=contacto_request.correo,
        telefono=contacto_request.telefono
    )
    return contacto_request

#Funcion eliminar
@app.delete('/api/v1/eliminar/{id_contacto}', tags=['Contactos'])
async def eliminar_contacto(id_contacto: int):
    contacto = Contacto.select().where(Contacto.id == id_contacto).first()

    if contacto:
        contacto.delete_instance()
        return True, 'Contacto eliminado exitosamente'
    else:
        return HTTPConnection(404, 'Contacto no encontrado')
    
#Fucion lista de contactos
@app.get('/api/v1/lista', tags=['Contactos'])
def listaContactos():
    tmp = CargarContactos()
    return tmp

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)