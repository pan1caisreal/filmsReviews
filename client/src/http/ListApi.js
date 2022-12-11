import {Api} from "./index";

export const addToList = async (element) =>{
    const {data} = await Api.post('list',element)
    return data
}

export const getMovie = async () =>{
    const{data} = await Api.get('list/get')
    return data
}

export const DeleteMovie = async (id) =>{
    const {data} = await Api.post('list/delete/' + id)
    return data
}