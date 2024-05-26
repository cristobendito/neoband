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
const register = async(data) => {
    try {
        const { bandname, email, password, passwordRepeat, bio, profilePicture = '' } = data;
        if(!bandname || !email || !password || !passwordRepeat || !bio || !profilePicture){
            return { error: "Todos los campos son obligatorios" };
        }
        if(password !== passwordRepeat){
            return { error: "Las contraseñas no coinciden" };
        }
        const bandData = {
            bandname,
            email,
            password,
            bio,
            profilePicture

        }
        const band = await create(bandData);
        if (!band) {
            return { error: "Error al crear el banda" };
        }
        return band;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const login = async(data) =>{
    const {bandname,email,password} = data;
    if((!bandname && !email) || !password){
        return {error:"Faltan datos",status:400};
    }
    try{
        let band;
        if(email){
        band = await getByProperty("email",email);
        band = band[0];
        }
        else{
            band = await getByProperty("bandname",bandname);
            band = band[0];
        }
        if(!band){
            return {error:"Usuario no encontrado",status:400};
        }

        const isPasswordCorrect = await bcrypt.compare(password,band.password);
        console.log("Contraseña: ",isPasswordCorrect)
        if(!isPasswordCorrect){
            return {error:"Contraseña incorrecta",status:400};
        }
        const token = jwt.sign({
            _id:band._id,
            bandname:band.bandname
            }, 
            process.env.JWT_SECRET, {expiresIn:60*60});
        return {token};
    }
    catch(error){
        console.error(error);
        return {error:"Error al iniciar sesión",status:500}
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
        const oldBand = await bandModel.findByIdAndUpdate(id,data);
        const band = await bandModel.findById(id);
        console.log("band",band);
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
    register,
    login,
    create,
    update,
    remove,
}

export default functions;

