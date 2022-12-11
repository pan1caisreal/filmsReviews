import React, {useContext} from 'react';
import {Button, Dropdown, Form, FormControl, FormGroup, Modal, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {useState,useEffect} from "react";
import {getActor, inTheFilm} from "../../http/ActorApi";
import {observer} from "mobx-react-lite";
import {Autocomplete, Checkbox, TextField} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {createFilm} from "../../http/FilmApi";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const CreateFilm = observer(({show,onHide}) => {
    const {films} = useContext(Context)
    const [actors,setActors] = useState([])

    const [title,setTitle] = useState('')
    const [genre,setGenre] = useState('')
    const [director,setDirector] = useState('')
    const [country,setCountry] = useState('')
    const [date,setDate] = useState('')
    const [information,setInformation] = useState('')
    const [file,setFile] = useState(null)
    const fixedOptions = []

    useEffect(() => {
        getActor().then(data => films.setActor(data))
    },[])


    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addFilm = () => {
        const formData = new FormData()
        formData.append('title',title)
        formData.append('genre',genre)
        formData.append('director',director)
        formData.append('country',country)
        formData.append('release_year',date)
        formData.append('info',information)
        formData.append('img',file)
        createFilm(formData).then()
        setTimeout(() => {
        actors.map(actor => {
            inTheFilm(actor).then((data) => onHide())
        })},2000)
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить фильм</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup className="mb-3">
                        <FormControl
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите название фильма"}
                            autoFocus
                        />
                        <FormControl
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите жанр фильма"}
                            autoFocus
                        />
                        <FormControl
                            value={director}
                            onChange={e => setDirector(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите режисера"}
                            autoFocus
                        />
                        <FormControl
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите страну"}
                            autoFocus
                        />
                        <FormControl
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите год премьеры"}
                            autoFocus
                        />
                        <Form.Control
                            value={information}
                            onChange={e => setInformation(e.target.value)}
                            as="textarea" rows={3}
                            style={{width: 700, marginLeft: 17}}
                            placeholder={"Введите краткую информацию о фильме"}
                        />
                        <div style={{marginTop: 20, marginLeft:18}}>

                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={films.actor}
                                value={actors}
                                onChange={(event, newValue) =>{
                                    setActors([...newValue.filter((option) => fixedOptions.indexOf(option) === -1)])
                                }}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name + " " + option.surname}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name + " " + option.surname}
                                    </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) =>
                                    (
                                    <TextField {...params} label="Checkboxes" placeholder="Favorites"/>
                                )}
                            />
                        </div>
                        <Form.Control
                            style={{width: 700}}
                            className="mt-3"
                            onChange={selectFile}
                            type="file"
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={addFilm}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateFilm;