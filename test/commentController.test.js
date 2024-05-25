import connectDB from "../src/config/mongo.js";
import mongoose from 'mongoose';
import commentController from "../src/controllers/commentController.js";
import bandController from "../src/controllers/bands/bandController.js";
import userController from "../src/controllers/users/userController.js";
import Comment from "../src/models/commentModel.js";
import User from "../src/models/userModel.js";

describe("Test commentController", () => {
    let bandId, userId;

    beforeAll(async () => {
        await connectDB();

        // Crear una banda  
        const bandData = { 
            bandname: "Nombre de la Banda",
            profilePicture: "http://example.com/profile.jpg",
            password: "securepassword",
            email: "band@example.com"
        };
        const band = await bandController.create(bandData);
        bandId = band._id;

        // Crear un usuario que comentará en perfil banda
        const userData = { 
            email: "correo@ejemplo.com", 
            username: "usuario",
            password: "securepassword",
            profilePicture: "http://example.com/userprofile.jpg"
        };
        const user = await userController.create(userData);
        userId = user._id;

        // Verificar si la colección "comments" existe, y si no, crearla
        const collections = await mongoose.connection.db.listCollections().toArray();
        const commentsCollectionExists = collections.some(collection => collection.name === 'comments');
        if (!commentsCollectionExists) {
            await mongoose.connection.createCollection('comments');
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        // Limpiar la colección de comentarios después de cada prueba
        await Comment.deleteMany({});
    });

    test("añadir comentario", async () => {
        const commentData = {
            content: "Contenido del comentario",
            band: bandId,
            user: userId
        };
        const comment = await commentController.create(commentData);
        expect(comment.content).toEqual(commentData.content);
        expect(comment.band.toString()).toEqual(bandId.toString());
        expect(comment.user.toString()).toEqual(userId.toString());
    });

    test("obtener comentarios por banda", async () => {
        const commentData1 = {
            content: "Primer comentario",
            band: bandId,
            user: userId
        };
        const commentData2 = {
            content: "Segundo comentario",
            band: bandId,
            user: userId
        };

        await commentController.create(commentData1);
        await commentController.create(commentData2);

        const comments = await commentController.getCommentsByBand(bandId);
        expect(comments.length).toEqual(2);
        expect(comments[0].content).toEqual("Primer comentario");
        expect(comments[1].content).toEqual("Segundo comentario");
    });

    test("borrar comentario", async () => {
        const commentData = {
            content: "Comentario a borrar",
            band: bandId,
            user: userId
        };
        const comment = await commentController.create(commentData);
        const removeComment = await commentController.remove(comment._id);
        expect(removeComment.message).toEqual("Comentario eliminado");

        const comments = await commentController.getAll(userId);
        expect(comments.length).toEqual(0);
    });

});
