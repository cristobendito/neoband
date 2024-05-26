import bandModel from "../../models/bandModel.js";

const getAll = async()=> {
    try {
        const bands = await bandModel.find();
        return bands;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const band = await bandModel.findById(id);
        
        return band;
    } catch (error) {
        console.error(error);
        return null;
    }
}


const getByProperty = async(property,value) =>{
    try {
        const comment = await bandModel.find({[property]:value})
        return comment;
    } catch (error) {
        return null;
    }
}

const create = async(data) =>{
    try {
        const band = await bandModel.create(data);
        return band;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const band = await bandModel.findByIdAndUpdate(id,data);
        return band;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const band = await bandModel.findByIdAndDelete(id);
        return band;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove,
}

export default functions;

