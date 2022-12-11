import {makeAutoObservable} from "mobx";

export default class UserMovie{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._isAdmin = false
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setIsAdmin(bool){
        this._isAdmin = bool
    }
    setUser(user){
        this._user = user
    }
    get IsAdmin(){
        return this._isAdmin
    }
    get IsAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }


}