const sequelize = require('../db');
const {QueryTypes} = require('sequelize')



const get = async (req,res) => {

    const {id} = req.params
    const list = await sequelize.query(
        "WITH q AS (SELECT lists_films.\"filmId\" FROM \"lists_films\" WHERE lists_films.\"listId\" = :status) SELECT * FROM films,q WHERE films.id = q.\"filmId\";", {
            replacements: {status: id},
            type: QueryTypes.SELECT
        })
    return res.json(list)
}

module.exports = {
    get,
}