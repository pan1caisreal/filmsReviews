import React, {useContext,useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import UpdatePost from "../component/modals/UpdatePost";
import {DeletePost} from "../http/ReviewApi";

const ReviewsList = observer(() => {
    const {films} = useContext(Context)
    const [updateVisible,setUpdateVisible] = useState(false)
    const [postId, setPostId] = useState(null)

    const activate = (id) =>{
        setUpdateVisible(true)
        setPostId(id)
    }

    const checkTitle = (review) =>{
        var title;
        films._films.map(films =>
        {
            if(review === films.id){
                console.log(films.title)
                title = films.title
            }
        })
        return title
    }

    return (
        <div style={{marginLeft: 200,marginTop:20,marginRight: 200,fontSize: 20, color: "white"}}>
            {films.reviews?.map(review =>
                <div className="review" style={{minHeight:200}}>
                    {review.estimation === "Положительная" &&
                        <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                            backgroundColor: "#EBF7EB", color:"black",flexDirection:"column"}}>
                            <div style={{justifyContent:"space-around",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                                {review.title} {checkTitle(review.filmId)}
                            </div>
                            <div style={{marginLeft:20}}>
                                {review.content}
                            </div>
                        </div>
                    }
                    {review.estimation === "Отрицательная" &&
                        <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                            backgroundColor: "#FFEBEB", color:"black",flexDirection:"column"}}>
                            <div style={{justifyContent:"space-around",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                                {review.title} {checkTitle(review.filmId)}
                            </div>
                            <div style={{marginLeft:20}}>
                                {review.content}
                            </div>
                        </div>
                    }
                    {review.estimation === "Нейтральная" &&
                        <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                            backgroundColor: "white", color:"black",flexDirection:"column"}}>
                            <div style={{justifyContent:"space-around",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                                {review.title} {checkTitle(review.filmId)}
                            </div>
                            <div style={{marginLeft:20}}>
                                {review.content}
                            </div>
                        </div>
                    }
                    {review.estimation === "undefined" &&
                        <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                            backgroundColor: "white", color:"black",flexDirection:"column"}}>
                            <div style={{justifyContent:"space-around",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                                {review.title} {checkTitle(review.filmId)}
                            </div>
                            <div style={{marginLeft:20}}>
                                {review.content}
                            </div>
                        </div>
                    }
                    <div style={{display:"flex", marginLeft: 20,justifyContent:"space-between"}}>
                        <Button
                            variant={"outline-light"}
                            className="mt-2 p-2"
                            onClick={() => DeletePost(review.id)}
                            style={{marginBottom:20}}
                        >
                            Удалить
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="mt-2"
                            onClick={() => activate(review.id)}
                            style={{marginBottom:20}}
                        >
                            Редактировать
                        </Button>
                    </div>
                </div>
            )}
            <UpdatePost show={updateVisible} onHide={() => setUpdateVisible(false)} postId={postId} />
        </div>
    );
});

export default ReviewsList;