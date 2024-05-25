import connectDB from "../src/config/mongo.js";
import mongoose from 'mongoose';
import bandController from "../src/controllers/bands/bandController.js";
import bandModel from "../src/models/bandModel.js";

const bandData = {
    bandname: "bandaEjemplo",
    email: "banda@example.com",
    password: "password123",
    profilePicture: "http://example.com/profile.jpg"
};

describe("Test de bandController",()=>{
    
    beforeAll(async ()=>{
        await connectDB();
        // verificar si la colección "bands" existe, y si no se crea
        const collections = await mongoose.connection.db.listCollections().toArray();
        const usersCollectionExists = collections.some(collection => collection.name === 'bands');
        if (!usersCollectionExists) {
            await mongoose.connection.createCollection('bands');
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })
    test("añadir banda", async () => {
        try {
            let band = await bandController.create(bandData);    
            // Verificar si la banda ya existe (es null en caso de error de CLAVE DUPLICADA)
            if (!band) {
                // Si la banda ya existe, borrar la base de datos y volver a crearla
                await mongoose.connection.db.dropDatabase();
                band = await bandController.create(bandData);
            }
            expect(band.email).toEqual(bandData.email);
            expect(band.bandname).toEqual(bandData.bandname);
        } catch (error) {
            console.error("Error durante la prueba 'añadir banda':", error);
            expect(error).toBeNull();
        }
    });
    test("buscar banda por propiedad",async()=>{
        const bands= await bandController.getByProperty("email","banda@example.com");
        expect(bands.length).toBeGreaterThanOrEqual(1);
        const band = bands[0];
        expect(band.email).toEqual(bandData.email);
        expect(band.bandname).toEqual(bandData.bandname);


    })
    test("buscar banda por id",async()=>{
        const bands= await bandController.getByProperty("email","banda@example.com");
        const newband = await bandController.getById(bands[0]._id);
        expect(newband).not.toBeNull();
        expect(newband.email).toEqual(bandData.email);
        expect(newband.bandname).toEqual(bandData.bandname);

    })
    
})