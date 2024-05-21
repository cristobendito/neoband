import connectDB from "../src/config/mongo";
import userModel from "../src/models/userModel";
import mongoose from "mongoose";

describe("Tests de modelo de usuario",()=>{
    beforeAll(async ()=>{
        await connectDB();
        try {
            await mongoose.connection.collections["users"].drop();
            
        } catch (error) {
            
        }

    }) 

    test("añadir registro",async()=>{
        const userData ={
            email:"mimail@mail.com",
            username:"usuario",
            password:"1234",
            role:"user",
            bio:"Hola soy user de prueba",
            profilePicture:""
        }
        const newModel = await userModel.create(userData);
        expect(newModel.email).toEqual(userData.email);
        expect(newModel.username).toEqual(userData.username);
        expect(newModel.role).toEqual(userData.role);
        expect(newModel.bio).toEqual(userData.bio);
;    })
})