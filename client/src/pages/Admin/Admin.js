import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import './Admin.css'
import CreateActor from "../../component/modals/CreateActor";
import CreateFilm from "../../component/modals/CreateFilm";

const Admin = () => {
    const [actorVisible,setActorVisible] = useState(false)
    const [filmVisible,setFilmVisible] = useState(false)
    return (
        <div className="AdminPage">
            <Container className="d-flex flex-column">
                <Button
                    onClick={() => setActorVisible(true)}
                    variant={"outline-light"}
                    className="mt-2"
                    style={{marginBottom:20}}

                >
                    Добавить актера

                </Button>
                <Button
                    onClick={() => setFilmVisible(true)}
                    variant={"outline-light"}
                    className="mt-2"
                >
                    Добавить фильм
                </Button>
                <CreateActor show={actorVisible} onHide={() => setActorVisible(false)}/>
                <CreateFilm show={filmVisible} onHide={() => setFilmVisible(false)}/>
            </Container>
        </div>
    );
};

export default Admin;