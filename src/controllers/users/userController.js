import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const getAll = async()=> {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}
const getByProperty = async(property,value) =>{
    try {
        const user = await userModel.find({[property]:value})
        return user;
    } catch (error) {
        return null;
    }
}
const register = async(data) =>{
    try {
        const {email,username,password,passwordRepeat} = data;
        if(!email || !username || !password || !passwordRepeat){
            return {error:"Todos los campos son obligatorios"};
        }
        if(password !== passwordRepeat){
            return {error:"Las contraseñas no coinciden"};
        }
        const userData = {
            email,
            username,
            password,
            role:"user"
        }
        const user = await create(userData);
        return user;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const login = async(data) =>{
    const {email,username,password} = data;
    if((!email && !username) || !password){
        return {error:"Faltan datos"};
    }
    try{
        let user;
        if(email){
        user = await getByProperty("email",email);
        user = user[0];
        }
        else{
            user = await getByProperty("username",username);
            user = user[0];
        }
        if(!user){
            return {error:"Usuario no encontrado"};
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        console.log("Contraseña: ",isPasswordCorrect)
        if(!isPasswordCorrect){
            return {error:"Contraseña incorrecta"};
        }
        const token = jwt.sign({
            _id:user._id,
            username:user.username,
            role:user.role}, 
            process.env.JWT_SECRET, {expiresIn:"1d"});
        return {token};
    }
    catch(error){
        console.error(error);
        return {error:"Error al iniciar sesión"}
    }
}

const create = async(data) =>{
    try {
        const hash = await bcrypt.hash(data.password,10);
        data.password = hash;
        const user = await userModel.create(data);
        return user;
    } catch (error) {
        console.error(error); 
        console.log("error no se pudo crear user");
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const user = await userModel.findByIdAndUpdate(id,data);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const user = await userModel.findByIdAndDelete(id);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addComment = async(userId,commentId)=>{
    try {
        const user = await getById(userId);
        console.log(user)
        if (user.comments===undefined){
            user.comments = [];
        }
        if(!user.comments.includes(commentId)){
/*             console.log("No incluye el id del comentario");
            console.log("ID Comentario: ",commentId);
            console.log("ID Usuario: ",userId) */
            user.comments.push(commentId);
            await user.save();
            return user;
        }
        console.log(user)
        return user;
    } catch (error) {
        console.error(error);
        return {error:"no se ha podido añadir el comentario"};
    }
}
const removecomment = async(userId,commentId)=>{
    try {
        const user = await getById(userId);
        if(user.comments.includes(commentId)){
            user.comments = user.comments.filter(p => !p.equals(commentId));
            await user.save();
            return user;
        }
        return user;
    } catch (error) {
        console.error(error);
        return {error:"no se ha podido añadir el comentario"};
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
    addComment,
    removecomment
}

export default functions;

/* import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAll = async()=> {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}
const getByProperty = async(property,value) =>{
    try {
        console.log("property",property)
        console.log("value",value)
        const user = await userModel.find({[property]:value})
        return user;
    } catch (error) {
        return null;
    }
}

const login = async(data) =>{
    const {email,username,password} = data;
    if((!email && !username ) || !password){
        return {error:"faltan datos",status:400};
    }
    try {
        let user;
        if(email){
            const users = await getByProperty("email",email);
            user = users[0];
        }
        else{
            const users = await getByProperty("username",username);
            user = users[0];
        }
        console.log("usurio",user);
        if(!user){
            return {error:"No existe el usurio",status:400};
        }
        console.log("contraseña",password,user.password);
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return {error:"Combinación de usuario y contraseña erroneos",status:400};
        }
        console.log("login user",user)
        const token = jwt.sign({_id:user._id,username:user.username,role:user.role},process.env.JWT_SECRET,{expiresIn: 60 * 60})
        return {token};

        
    } catch (error) {
        console.error(error);
        return {error:"Ha habido un error",status:500};
    }
}
const register = async(data) => {
    const {email,username,password,passwordRepeat} = data;
    if(!email || !username || !password || !passwordRepeat){
        return {error:"Falta alguno de los campos"};
    }
    if(password !== passwordRepeat){
        return {error:"Las contraseñas no coinciden"};
    }
    const userData = {
        email,
        username,
        password,
        role:"user"
    }
    const user = await create(userData);
    return user;
}
const create = async(data) =>{
    try {
        const hash = await bcrypt.hash(data.password,10);
        data.password = hash;
        const user = await userModel.create(data);
        return user;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const oldUser = await userModel.findByIdAndUpdate(id,data);
        const user = await userModel.findById(id);
        console.log("usurio",user);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const user = await userModel.findByIdAndDelete(id);
        return user;
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
    login,
    register,
    update,
    remove,
}

export default functions; */