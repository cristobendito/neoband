import commentController from "./commentController.js";

const getAll = async (req, res) => {
    const comments = await commentController.getAll();
    res.json({ data: comments });
}

const getById = async (req, res) => {
    const id = req.params.id;
    const comment = await commentController.getById(id);
    res.json({ data: comment });
}

const getByProperty = async (req, res) => {
    const { property, value } = req.query;
    const comments = await commentController.getByProperty(property, value);
    res.json({ data: comments });
}

const register = async (req, res) => {
    const comment = await commentController.create(req.body);
    if (comment.error) {
        return res.status(400).json({ error: comment.error });
    }
    res.json({ data: comment });
}

const create = async (req, res) => {
    const owner = req.user._id;
    const data = { ...req.body, owner };
    const comment = await commentController.create(data);
    res.json({ data: comment });
}

const remove = async (req, res) => {
    const id = req.params.id;
    const comment = await commentController.remove(id);
    res.json({ data: comment });
}

export default {
    getAll,
    getById,
    getByProperty,
    register,
    create,
    remove
}
