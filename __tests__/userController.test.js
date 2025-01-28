//1. Importamos dependencias, modulos y/o funciones
//Como vamos a probar peticiones importasmos el super test
import supertest from "supertest";
import app from "../app.js"// Nos permite probar la conexión a base de datos, a rutas y poder probar los controllers, por eso ya no tenemos que importar el archivo del controllers aunque sea el que vamos a probar.
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";

//2. Definir los bloques de prueba, para ello usamos el describe.

describe('Pruebas de los controladores de los usuarios', () => {

    beforeEach(async ()=>{
        await userModel.deleteMany({});
    });

    afterAll(async ()=>{
        await mongoose.connection.close();
    });

    const testUser = {
        fullName: 'Jonathan Jimenez',
        email: 'jonathan@gmail.com',
        password: '123'
    }

    //2.1 Defino Bloque de Pruebas Para peticion POST
    describe('Pueba POST / User', ()=>{
        it('Deberia crear un usuario correctamente', async()=>{
            const res = await supertest(app).post('/usuarios').send(testUser)
            expect(res.statusCode).toBe(201);
        });

        it('Deberia crear un error si falta un campo obligatrio', async()=>{
            const res = await supertest(app).post('/usuarios').send({email:testUser.fullName});
            expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al crear un usuario');
        });
    });

    //2.1 Defino Bloque de Pruebas Para peticion GET
    describe('Pueba GET / User', ()=>{
        it('Deberia indicar que no hay usuarios almacenados', async()=>{
            const res = await supertest(app).get('/usuarios')
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje', 'No hay usuarios almacenados');
        });
    });

});