const {Lists,Lists_Films} = require("../models/models");
const ApiError = require("../error/ApiError");


const create = async (req,res,next) => {
    try {
        const {userId,filmId} = req.body
        const listId = userId
        const list = await Lists_Films.create({listId,filmId})
        return res.json(list)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }

}

const getAll = async (req,res) => {
    const list = await Lists_Films.findAll()
    return res.json(list)
}

const deleteMovie = async (req,res,next) =>{
    try {
        const {id} = req.params
        const list = await Lists_Films.findOne({where:{id}})
        await list.destroy()
        return res.json(list)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }
}



module.exports = {
    create,
    getAll,
    deleteMovie,
}