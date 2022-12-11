const sequelize = require('../db')
const {DataTypes} = require("sequelize")

const Users = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    login:{type:DataTypes.STRING, unique: true,},
    email:{type:DataTypes.STRING, unique: true,},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING,defaultValue: "USER"},
})

const Reviews = sequelize.define('reviews',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    title:{type:DataTypes.STRING},
    content:{type:DataTypes.STRING},
    estimation:{type:DataTypes.STRING},
})

const Lists = sequelize.define('lists',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    list_name:{type:DataTypes.STRING},
})

const Lists_Films = sequelize.define('lists_films',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
})

const Films = sequelize.define('films',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    title:{type:DataTypes.STRING},
    genre:{type:DataTypes.STRING},
    director:{type:DataTypes.STRING},
    country:{type:DataTypes.STRING},
    release_year:{type:DataTypes.DATE},
    info:{type:DataTypes.TEXT},
    img:{type:DataTypes.STRING},
})

const Films_Actor = sequelize.define('films_actor',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
})

const Actor = sequelize.define('actor',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    name:{type:DataTypes.STRING},
    surname:{type:DataTypes.STRING},
    date_of_birth:{type:DataTypes.DATE},
    country:{type:DataTypes.STRING},
    height:{type:DataTypes.STRING},
    img:{type:DataTypes.STRING},
})

Users.hasMany(Reviews)
Reviews.belongsTo(Users)

Users.hasMany(Lists)
Lists.belongsTo(Users)

Films.hasMany(Reviews)
Reviews.belongsTo(Films)

Lists.belongsToMany(Films,{through: Lists_Films})
Films.belongsToMany(Lists,{through: Lists_Films})

Films.belongsToMany(Actor,{through: Films_Actor})
Actor.belongsToMany(Films,{through: Films_Actor})

module.exports = {
    Users,
    Reviews,
    Lists,
    Lists_Films,
    Films,
    Films_Actor,
    Actor
}