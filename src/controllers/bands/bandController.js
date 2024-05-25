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

/* import bandModel from "../../models/bandModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAll = async () => {
    try {
        const bands = await bandModel.find();
        return bands;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async (id) => {
    try {
        const band = await bandModel.findById(id);
        return band;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getByProperty = async (property, value) => {
    try {
        const band = await bandModel.find({ [property]: value });
        return band;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const login = async (data) => {
    const { email, username, password } = data;
    if ((!email && !username) || !password) {
        return { error: "Faltan datos", status: 400 };
    }
    try {
        let band;
        if (email) {
            const bands = await getByProperty("email", email);
            band = bands[0];
        } else {
            const bands = await getByProperty("username", username);
            band = bands[0];
        }
        if (!band) {
            return { error: "No existe la banda", status: 400 };
        }
        const isPasswordCorrect = await bcrypt.compare(password, band.password);
        if (!isPasswordCorrect) {
            return { error: "Combinación de usuario y contraseña incorrectos", status: 400 };
        }
        const token = jwt.sign({ _id: band._id, username: band.username, role: band.role }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        return { token };
    } catch (error) {
        console.error(error);
        return { error: "Hubo un error inesperado", status: 500 };
    }
}

const register = async (data) => {
    const { email, username, password, passwordRepeat } = data;
    if (!email || !username || !password || !passwordRepeat) {
        return { error: "Falta alguno de los campos" };
    }
    if (password !== passwordRepeat) {
        return { error: "Las contraseñas no coinciden" };
    }
    const bandData = {
        email,
        username,
        password,
        role: "band"
    }
    const band = await create(bandData);
    return band;
}

const create = async (data) => {
    try {
        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;
        const band = await bandModel.create(data);
        return band;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        const oldBand = await bandModel.findByIdAndUpdate(id, data);
        const band = await bandModel.findById(id);
        return band;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async (id) => {
    try {
        const user = await bandModel.findByIdAndDelete(id);
        if (!user) {
            throw new Error("Banda no encontrada");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw error; // Lanza la excepción para que pueda ser manejada en el lugar donde se llama a esta función
    }
}

export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    login,
    register,
    update,
    remove
}

export default functions;
 */