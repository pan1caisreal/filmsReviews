const {Films} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')


const create = async (req,res,next) => {
    try {
        const {title,genre,director,country,release_year,info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname,'..','static', fileName))
        const film = await Films.create({title,genre,director,country,release_year,info,img:fileName})
        return res.json(film)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }

}

const getAll = async (req,res) => {
    let {genre,limit,page} = req.query
    page = page || 1
    limit = limit || 12
    let offset = page * limit - limit
    let films;
    if(!genre){
        films = await Films.findAndCountAll({limit,offset})
    }
    else{
        films = await Films.findAndCountAll({where:{genre},limit,offset})
    }
    return res.json(films)
}

const getOne = async (req,res,next) => {
    try {
        const {id} = req.params
        const films = await Films.findOne({where: {id} })
        return res.json(films)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }
}

module.exports = {
    create,
    getAll,
    getOne,
}