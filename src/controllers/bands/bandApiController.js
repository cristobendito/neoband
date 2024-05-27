import bandController from "./bandController.js";

const getAll = async(req,res)=>{
    const bands = await bandController.getAll();
    res.json({data:bands});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const band = await bandController.getById(id);
    res.json({data:band});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const bands = await bandController.getByProperty(property,value);
    res.json({data:bands})
}

const register = async(req,res)=>{
    const band = await bandController.register(req.body);
    if(band.error){
        return res.json({error:band.error});
    }
    res.json({data:band})
}
const login = async(req,res) => {
    const data = await bandController.login(req.body);
    if(data.error){
        return res.status(data.status).json({error:data.error});
    }
    res.json({token:data.token})
}
const create = async(req,res)=>{
    const band = await bandController.create(req.body);
    res.json({data:band})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const band = await bandController.update(id,req.body);
    res.json({data:band})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const band = await bandController.remove(id);
    res.json({data:band})
}

export default{
    getAll,
    getById,
    getByProperty,
    login,
    register,
    create,
    update,
    remove
}

