import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Image} from "react-bootstrap";
import dayjs from "dayjs";
import './filmPage.css'
import {useNavigate, useParams} from "react-router-dom";
import {getFilms, getOneActor} from "../../http/ActorApi";
import {Context} from "../../index";
import {FILM_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";

const ActorPage = observer(() => {
    const [actor,setActor] = useState({})
    const navigate = useNavigate()
    const {films} = useContext(Context)
    const {id} = useParams()
    useEffect(() =>{
        getOneActor(id).then(data => setActor(data))
        getFilms(id).then(data => films.setActorFilm(data))
    },[])
    return (
        <div className="filmPage">
            <Container className="mt-3">
                <Col md={4}>
                    <Image width={300} height={400} src={'http://localhost:4000/' + actor.img}/>
                </Col>
                <Col md={8} style={{marginTop: -100}}>
                    <h2 style={{display:"flex",paddingLeft: 100}}>{actor.name + " " + actor.surname}</h2>
                    <h3 style={{display:"flex",paddingLeft: 100,marginTop:50}}>О персоне</h3>
                    <div style={{display:"flex", marginTop: 50,width:400}}>
                        <div style={{marginRight: 150,width:150}}>Рост</div>
                        <div>{actor.height} м</div>
                    </div>
                    <div style={{display:"flex", marginTop: 20,width: 450}}>
                        <div style={{marginRight: 150, width:150}}>Дата рождения</div>
                        <div>{dayjs(actor.date_of_birth).format('DD/MMMM/YYYY')}</div>
                    </div>
                    <div style={{display:"flex", marginTop: 20,width: 450}}>
                        <div style={{marginRight: 150, width:150}}>Страна</div>
                        <div>{actor.country}</div>
                    </div>
                </Col>
            </Container>
            <div style={{display: "flex",justifyContent:"center",color: "white",fontSize: 25}}>Фильмы</div>
            <div style={{marginLeft: 200,marginTop:40,marginRight: 200,fontSize: 20, color: "white"}}>
                {films.actorFilm?.map(film =>
                    <div
                        key={film.id}
                        onClick={() => navigate(FILM_ROUTE + "/" + film.id)}
                        style={{marginBottom: 20, display:"flex",cursor:"pointer"}}
                    >
                        {film.title} {dayjs(film.release_year).format('YYYY')}
                    </div>
                )

                }
            </div>
        </div>
    );
});

export default ActorPage;