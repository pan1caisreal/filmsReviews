const {Reviews} = require('../models/models')
const ApiError = require('../error/ApiError')

const create = async (req,res) => {
    const {title,content,estimation,userId,filmId} = req.body
    const review = await Reviews.create({title,content,estimation,userId,filmId})
    return res.json(review)
}

const getAll = async (req,res) => {
    const {id} = req.params
    const review = await Reviews.findAll({where:{filmId: id}})
    return res.json(review)
}

module.exports = {
    create,
    getAll,
}