import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import bandModel from "../models/bandModel.js";

const getAll = async (userId) => {
    try {
        const comments = await commentModel.find({ user: userId });
        return comments;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async (id) => {
    try {
        const comment = await commentModel.findById(id);
        return comment;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getByProperty = async (property, value) => {
    try {
        const comment = await commentModel.find({ [property]: value });
        return comment;
    } catch (error) {
        return null;
    }
}

const getByUserId = async (userId) => {
    try {
        const comment = await commentModel.find({ user: userId });
        return comment;
    } catch (error) {
        return null;
    }
}

const create = async (data) => {
    try {
        const comment = await commentModel.create(data);
        return comment;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        const comment = await commentModel.findByIdAndUpdate(id, data, { new: true });
        return comment;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async (id) => {
    try {
        const comment = await commentModel.findByIdAndDelete(id);
        if (comment) {
            return { message: 'Comentario eliminado', status: 200 };
        } else {
            return { error: 'Comentario no encontrado', status: 404 };
        }
    } catch (error) {
        console.error(error);
        return { error: 'Error al eliminar comentario', status: 500 };
    }
}

const getCommentsByBand = async (bandId) => {
    try {
        const comments = await commentModel.find({ band: bandId }).populate('user', 'username');
        return comments;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const functions = {
    getAll,
    getById,
    getByProperty,
    getByUserId,
    create,
    update,
    remove,
    getCommentsByBand
}

export default functions;
