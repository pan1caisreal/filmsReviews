const {Actor, Films_Actor} = require('../models/models')
const sequelize = require('../db');
const {QueryTypes} = require('sequelize')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

const create = async (req,res,next) => {
    try {
        const {name,surname,date_of_birth, country,height} = req.body
        const {img}=req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname,'..','static', fileName))
        const actor = await Actor.create({name,surname,date_of_birth,country,height,img:fileName})
        return res.json(actor)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }
}

const getAll = async (req,res) => {
    const actor = await Actor.findAll()
    return res.json(actor)
}

const getOne = async (req,res) => {
    const {id} = req.params

    const actor = await Actor.findOne({where:{id}})
    return res.json(actor)
}

const inTheFilm = async (req,res,next) => {
    try {
        const {id} = req.body
        const filmIdd = await sequelize.query("select id from films offset ((select count(*) from films)-1)", {
                type: QueryTypes.SELECT
            })
        const filmId = filmIdd[0].id
        const actorId = id
        const list = await Films_Actor.create({filmId,actorId})
        return res.json(list)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    inTheFilm,
}