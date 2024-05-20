import connectDB from "../src/config/mongo";
import userModel from "../src/models/userModel";

describe("Tests de modelo de usuario",()=>{
    beforeAll(()=>{
        userModel.collection.drop();

    })
    test("añadir registro", async()=>{
        const userData ={
            email:"mimail@mail.com",
            username:"usuario",
            password:"1234",
            role:"admin",
            bio:"Hola soy user de prueba"
        }
        const newModel = await userModel.create(userData);
        expect(newModel.email).toEqual(userData.email);
        expect(newModel.username).toEqual(userData.username);
        expect(newModel.role).toEqual(userData.role);
        expect(newModel.bio).toEqual(userData.bio);
;    })
})