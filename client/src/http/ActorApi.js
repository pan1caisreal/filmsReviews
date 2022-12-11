import {authApi,Api} from "./index";


export const createActor = async (actor) =>{
    const {data} = await authApi.post('actor',actor)
    return data
}

export const getActor = async () =>{
    const {data} = await Api.get('actor/')
    return data
}

export const getOneActor = async (id) =>{
    const {data} = await Api.get('actor/' + id)
    return data
}

export const inTheFilm = async (id) =>{
    const {data} = await authApi.post('actorFilm',id)
    return data
}

export const getFilms = async (id) =>{
    const {data} = await Api.get('actorFilm/films/' + id)
    return data
}