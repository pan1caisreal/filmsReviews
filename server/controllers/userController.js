const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {Users,Lists} = require("../models/models");
const jwt = require('jsonwebtoken')

const generateJwt = (id,email,role,login) => {
    return jwt.sign(
        {id,email,role,login},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

const registration = async (req,res, next) => {
    const {email,login,password,role} = req.body
    if(!email || !password){
        return next(ApiError.badRequest("Некорректный email или password"))
    }
    const candidate = await Users.findOne({where: {email}})
    if(candidate){
        return next(ApiError.badRequest(`User with email ${email} already exist`))
    }
    const candidateLogin = await Users.findOne({where: {login}})
    if(candidateLogin)
    {
        return next(ApiError.badRequest(`User with login ${login} already exist`))
    }
    const hashPassword = await bcrypt.hash(password,5)
    const user = await Users.create({email,login,role, password:hashPassword})
    const list = await Lists.create({userId:user.id,list_name:"Хочу посмотреть"})
    const token = generateJwt(user.id,user.email,user.role,user.login)
    return res.json({token})
}

const login = async (req,res,next) => {
    const {email,password} = req.body
    const user = await Users.findOne({where: {email}})
    if(!user){
        return next(ApiError.badRequest(`User with email ${email} not found.`))
    }
    let comparePassword = bcrypt.compareSync(password,user.password)
    if(!comparePassword){
        return next(ApiError.badRequest(`Password uncorrected`))
    }
    const token = generateJwt(user.id,user.email,user.role,user.login)
    return res.json({token})
}

const check = async (req,res,next) => {
    const token = generateJwt(req.user.id,req.user.email,req.user.role,req.user.login)
    return res.json({token})
}

module.exports = {
    registration,
    login,
    check,
}