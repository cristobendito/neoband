import connectDB from "../src/config/mongo.js";
import mongoose from 'mongoose';
import userController from "../src/controllers/users/userController.js";


const userData = {
    email:"user@example.com",
    username:"usuario",
    password:"1234",
    role:"admin",
    profilePicture: "http://example.com/profile.jpg"
}

describe("Test de userController",()=>{
    
    beforeAll(async ()=>{
        await connectDB();
        // verificar si la colección "users" existe, y si no se crea
        const collections = await mongoose.connection.db.listCollections().toArray();
        const usersCollectionExists = collections.some(collection => collection.name === 'users');
        if (!usersCollectionExists) {
            await mongoose.connection.createCollection('users');
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })
    test("añadir user", async () => {
        try {
            let user = await userController.create(userData);    
            // Verificar si la usera ya existe (es null en caso de error de CLAVE DUPLICADA)
            if (!user) {
                // Si user ya existe, borrar la base de datos y volver a crearla
                await mongoose.connection.db.dropDatabase();
                user = await userController.create(userData);
            }
            expect(user.email).toEqual(userData.email);
            expect(user.username).toEqual(userData.username);
        } catch (error) {
            console.error("Error durante la prueba 'añadir user':", error);
            expect(error).toBeNull();
        }
    });
    test("buscar user por propiedad",async()=>{
        const users= await userController.getByProperty("email","user@example.com");
        expect(users.length).toBeGreaterThanOrEqual(1);
        const user = users[0];
        expect(user.email).toEqual(userData.email);
        expect(user.username).toEqual(userData.username);


    })
    test("buscar user por id",async()=>{
        const users= await userController.getByProperty("email","user@example.com");
        const newuser = await userController.getById(users[0]._id);
        expect(newuser).not.toBeNull();
        expect(newuser.email).toEqual(userData.email);
        expect(newuser.username).toEqual(userData.username);

    })
    
})





/* import connectDB from '../src/config/mongo';
import mongoose from 'mongoose';
import userController from "src/config/controllers/userController.js";

const userData = {
    email:"mimail@mail.com",
    username:"usuario",
    password:"1234",
    role:"admin"
}

describe("Test de userController",()=>{
    
    beforeAll(async ()=>{
        await connectDB();
        try {
            await mongoose.connection.collections["users"].drop();
            
        } catch (error) {
            
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })

    test("añadir usuario",async()=>{
        const user = await userController.create(userData);
        expect(user.email).toEqual(userData.email);
        expect(user.username).toEqual(userData.username);
        expect(user.role).toEqual(userData.role);
    })
    test("buscar usuario por propiedad",async()=>{
        const users= await userController.getByProperty("email","mimail@mail.com");
        expect(users.length).toBeGreaterThanOrEqual(1);
        const user = users[0];
        expect(user.email).toEqual(userData.email);
        expect(user.username).toEqual(userData.username);
        expect(user.role).toEqual(userData.role);

    })
    test("buscar usuario por id",async()=>{
        const users= await userController.getByProperty("email","mimail@mail.com");
        const newUser = await userController.getById(users[0]._id);
        expect(newUser).not.toBeNull();
        expect(newUser.email).toEqual(userData.email);
        expect(newUser.username).toEqual(userData.username);
        expect(newUser.role).toEqual(userData.role);
    })
    
}) */