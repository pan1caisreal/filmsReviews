import React from 'react';
import {Col, Card, Image} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";
import {FILM_ROUTE} from "../utils/consts";

const Film = ({films}) => {
    const navigate = useNavigate()
    return (
            <Col md={3} className={"mt-3"} onClick={() => navigate(FILM_ROUTE + "/" + films.id)}>
                <Card style={{width: 300, cursor:"pointer", marginLeft: 20, marginBottom:20 , position: "static"}} border={"light"}>
                    <Image width={300} height={300} src={'http://localhost:4000/' + films.img}/>
                    <div className="d-flex justify-content-center">{films.title}</div>
                </Card>
            </Col>
    );
};

export default Film;