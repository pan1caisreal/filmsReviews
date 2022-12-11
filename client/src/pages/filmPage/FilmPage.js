import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Image} from "react-bootstrap";
import './filmPage.css'
import {useNavigate, useParams} from "react-router-dom";
import {getActors, getOneFilm} from "../../http/FilmApi";
import dayjs from "dayjs";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Input from "../../utils/input/input";
import {createReview, getReview} from "../../http/ReviewApi";
import {addToList, getMovie,DeleteMovie} from "../../http/ListApi";
import {ACTOR_ROUTE} from "../../utils/consts";

const FilmPage = observer(() => {
    const [film,setFilm] = useState({})
    const {films} = useContext(Context)
    const {id} = useParams()
    const user_id = localStorage.getItem('id')
    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    const addMovie = () =>{
        const formData = new FormData()
        const user_id = localStorage.getItem('id')
        formData.append('userId',user_id)
        formData.append('filmId',id)
        addToList(formData).then()
    }

    const addReview = () =>{
        const formData = new FormData()

        formData.append('title',title)
        formData.append('content',content)
        formData.append('estimation', films.selectedEstimate.name)
        formData.append('userId', user_id)
        formData.append('filmId',id)
        createReview(formData).then(setTitle(''),setContent(''),films.setSelectedEstimate({}))
    }

    const Check = (count,user_id,id) => {
        films.listfilm?.map(list =>{
            if(list.listId.toString() === user_id && list.filmId.toString() === id) {
                count++
            }
        })
        return count
    }

    const CheckId = (count) => {
        films.listfilm?.map(list =>{
            if(list.listId.toString() === user_id && list.filmId.toString() === id) {
                count = list.id
            }
        })
        return count
    }

    useEffect(() =>{
        getOneFilm(id).then(data => setFilm(data))
        getReview(id).then(data => films.setReview(data))
        getMovie().then(data => films.setListFilm(data))
        getActors(id).then(data => films.setActorFilm(data))
    },[])


    return (
        <div className="filmPage">
            <Container className="mt-3">
                <Col md={4}>
                    <Image width={350} height={400} src={'http://localhost:4000/' + film.img}/>
                </Col>
                <Col md={8} style={{marginTop: -50}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <h2 style={{display:"flex"}}>{film.title}</h2>
                        {Check(0,user_id,id) === 1 ?
                             <Button
                                 variant={"outline-light"}
                                 className="mt-2"
                                 onClick={() => DeleteMovie(CheckId(0))}
                                 style={{marginBottom: 20, marginLeft: 90}}
                             >
                                 Удалить из избранного
                             </Button>
                            :
                            <Button
                                variant={"outline-light"}
                                className="mt-2"
                                onClick={() => addMovie()}
                                style={{marginBottom: 20, marginLeft: 90}}
                            >
                                Хочу посмотреть
                            </Button>
                        }
                    </div>
                    <div style={{display:"flex", marginTop: 100,width:400}}>
                        <div style={{marginRight: 150,width:100}}>Жанр</div>
                        <div>{film.genre}</div>
                    </div>
                    <div style={{display:"flex", marginTop: 20,width: 400}}>
                        <div style={{marginRight: 150, width:100}}>Режисер</div>
                        <div>{film.director}</div>
                    </div>
                    <div style={{display:"flex", marginTop: 20,width: 400}}>
                        <div style={{marginRight: 150, width:100}}>Страна</div>
                        <div>{film.country}</div>
                    </div>
                    <div style={{display:"flex", marginTop: 20,width: 400}}>
                        <div style={{marginRight: 150, width:100}}>Премьера</div>
                        <div>{dayjs(film.release_year).format('YYYY')}</div>
                    </div>
                </Col>
            </Container>
            <div style={{display: "flex",justifyContent:"center",color: "white",fontSize: 25}}>О фильме</div>
            <div style={{marginLeft: 200,marginTop:40,marginRight: 200,fontSize: 20, color: "white"}}>
                {film.info}
            </div>
            <div style={{display: "flex",color: "white",fontSize: 25, marginTop: 40, marginLeft: 110}}>В главных ролях</div>
            <div style={{marginLeft: 200,marginTop:40,marginRight: 200,fontSize: 20, color: "white"}}>
                {films.actorFilm?.map(actors =>
                    <div
                        onClick={() => navigate(ACTOR_ROUTE + "/" + actors.id)}
                        key={actors.id}
                        style={{marginBottom:10, cursor:"pointer"}}
                    >
                        {actors.name} {actors.surname}
                    </div>
                )}
            </div>
            <div style={{display: "flex",color: "white",fontSize: 25, marginTop: 40, marginLeft: 110}}>Рецензии</div>
            <div style={{marginLeft: 200,marginTop:20,marginRight: 200,fontSize: 20, color: "white"}}>
                {films.reviews?.map(review =>
                <div className="review" style={{minHeight:200}}>
                    {review.estimation === "Положительная" &&
                    <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                        backgroundColor: "#EBF7EB", color:"black",flexDirection:"column"}}>
                        <div style={{justifyContent:"center",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                            {review.title}
                        </div>
                        <div style={{marginLeft:20}}>
                            {review.content}
                        </div>
                    </div>
                    }
                    {review.estimation === "Отрицательная" &&
                        <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                            backgroundColor: "#FFEBEB", color:"black",flexDirection:"column"}}>
                            <div style={{justifyContent:"center",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                                {review.title}
                            </div>
                            <div style={{marginLeft:20}}>
                                {review.content}
                            </div>
                        </div>
                    }
                    {review.estimation === "Нейтральная" &&
                        <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                            backgroundColor: "white", color:"black",flexDirection:"column"}}>
                            <div style={{justifyContent:"center",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                                {review.title}
                            </div>
                            <div style={{marginLeft:20}}>
                                {review.content}
                            </div>
                        </div>
                    }
                    {review.estimation === "undefined" &&
                        <div key={review.id} style={{borderRadius:10,display:"flex",justifyContent:"space-between",
                            backgroundColor: "white", color:"black",flexDirection:"column"}}>
                            <div style={{justifyContent:"center",display:"flex",marginLeft:10,marginRight:10,borderBottom:"1px solid gray"}}>
                                {review.title}
                            </div>
                            <div style={{marginLeft:20}}>
                                {review.content}
                            </div>
                        </div>
                    }
                </div>
                )}
            </div>
            <div  style={{display:"flex",color:"white",marginTop:40,marginLeft:110,flexDirection:"column"}}>
                <div style={{fontSize:25}}>Написать рецензию</div>
                <div className="review">
                    <Dropdown className="mt-2 mb-2 dropdown">
                        <Dropdown.Toggle>{films.selectedEstimate.name || "Тип рецензии"}</Dropdown.Toggle>
                        <Dropdown.Menu className={"dropdown-menu-dark"}>
                            {films.estimate?.map(estimate =>
                                <Dropdown.Item
                                    onClick={() => films.setSelectedEstimate(estimate)}
                                    key ={estimate.id}
                                >
                                    {estimate.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Заголовок"/>
                    <textarea
                        style={{resize:"none", height:300,width: 400,marginLeft:17}}
                        className="form-control"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Текст"
                    />
                    <Button
                        variant={"outline-light"}
                        className="mt-2"
                        onClick={addReview}
                        style={{marginBottom:20, marginLeft: 90}}
                    >
                        Опубликовать рецензию
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default FilmPage;