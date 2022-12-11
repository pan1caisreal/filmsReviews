import React, {useContext, useEffect} from 'react';
import './Posts.css'
import ReviewsList from "../../component/ReviewsList";
import {getReviewUser} from "../../http/ReviewApi";
import {Context} from "../../index";

const Posts = () => {
    const user_id = localStorage.getItem('id')
    console.log(user_id)
    const {films} = useContext(Context)
    useEffect(() =>{
        getReviewUser(user_id).then(data => films.setReview(data))
    },[])
    return (
        <div className="Posts">
            <ReviewsList />
        </div>
    );
};

export default Posts;