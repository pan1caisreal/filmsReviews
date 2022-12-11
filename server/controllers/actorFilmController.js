const sequelize = require('../db');
const {QueryTypes} = require('sequelize')


const get = async (req,res) => {

    const {id} = req.params
    const list = await sequelize.query(
        "WITH q AS (SELECT films_actors.\"actorId\" FROM \"films_actors\" WHERE films_actors.\"filmId\" = :status) SELECT * FROM actors,q WHERE actors.id = q.\"actorId\";", {
            replacements: {status: id},
            type: QueryTypes.SELECT
        })
    return res.json(list)
}

const getFilms = async (req,res) =>{
    const {id} = req.params
    const list = await sequelize.query(
        "WITH q AS (SELECT films_actors.\"filmId\" FROM \"films_actors\" WHERE films_actors.\"actorId\" = :status) SELECT * FROM films,q WHERE films.id = q.\"filmId\";", {
            replacements: {status: id},
            type: QueryTypes.SELECT
        })
    return res.json(list)
}

module.exports = {
    get,
    getFilms
}