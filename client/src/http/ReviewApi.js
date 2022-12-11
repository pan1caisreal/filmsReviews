import {authApi,Api} from "./index";


export const createReview = async (review) =>{
    const {data} = await authApi.post('review',review)
    return data
}

export const getReview = async (id) =>{
    const {data} = await Api.get('review/' + id)
    return data
}

export const getReviewUser = async (id) =>{
    const {data} = await Api.get('post/' + id)
    return data
}

export const UpdatePostUser = async (id,review) =>{
    const {data} = await Api.post('post/update/' + id, review)
    return data
}

export const DeletePost = async (id) =>{
    const {data} = await Api.post('post/delete/' + id)
}