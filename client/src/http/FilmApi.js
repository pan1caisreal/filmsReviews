import {authApi,Api} from "./index";

export const createFilm = async (film) =>{
    const {data} = await authApi.post('film',film)
    return data
}

export const getFilm = async (page,limit = 4) =>{
    const {data} = await Api.get('film/',{
        params:{
            page,limit
        }
    })
    return data
}

export const getOneFilm = async (id) =>{
    const {data} = await Api.get('film/' + id)
    return data
}

export const getMovie = async (id) =>{
    const {data} = await Api.get('movie/' + id)
    return data
}

export const getActors = async (id) =>{
    const {data} = await Api.get('actorFilm/' + id)
    return data
}