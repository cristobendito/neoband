import commentController from "./commentController.js";

const getAll = async(req,res)=>{
    const comments = await commentController.getAll();
    res.json({data:comments});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const comment = await commentController.getById(id);
    res.json({data:comment});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const comments = await commentController.getByProperty(property,value);
    res.json({data:comments})
}

const register = async(req,res)=>{
    const comment = await commentController.register(req.body);
    if(comment.error){
        return res.json({error:comment.error});
    }
    res.json({data:comment})
}
const login = async(req,res) => {
    const data = await commentController.login(req.body);
    if(data.error){
        return res.status(data.status).json({error:data.error});
    }
    res.json({token:data.token})
}
const create = async(req,res)=>{
    const comment = await commentController.create(req.body);
    res.json({data:comment})
}


const remove = async(req,res)=>{
    const id= req.params.id;
    const comment = await commentController.remove(id);
    res.json({data:comment})
}

export default{
    getAll,
    getById,
    getByProperty,
    login,
    register,
    create,
    remove
}

