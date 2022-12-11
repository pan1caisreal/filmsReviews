const {Reviews} = require("../models/models");
const ApiError = require("../error/ApiError");


const getAllUser = async (req,res) => {
    const {id} = req.params
    const review = await Reviews.findAll({where:{userId: id}})
    return res.json(review)
}

const updatePost = async (req,res,next) =>{
    try {
        const {id} = req.params
        const {title,content,estimation} = req.body
        const review = await Reviews.findOne({where:{id}})
        await review.update({title: title,content: content,estimation: estimation})
        return res.json(review)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }
}

const deletePost = async (req,res,next) =>{
    try {
        const {id} = req.params
        const review = await Reviews.findOne({where:{id}})
        await review.destroy()
        return res.json(review)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }
}

module.exports = {
    getAllUser,
    updatePost,
    deletePost,
}