import React, {useState} from 'react';
import {Button, Form, FormControl, FormGroup, Modal} from "react-bootstrap";
import {createActor} from "../../http/ActorApi";

const CreateActor = ({show,onHide}) => {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [date,setDate] = useState('')
    const [country,setCountry] = useState('')
    const [height,setHeight] = useState('')
    const [file,setFile] = useState(null)

    const addActor = () =>{
        const formData = new FormData()
        formData.append('name',name)
        formData.append('surname',surname)
        formData.append('date_of_birth',date)
        formData.append('country',country)
        formData.append('height',height)
        formData.append('img',file)
        createActor(formData).then(data => onHide())
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить актера</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup className="mb-3">
                        <FormControl
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите имя актера"}
                            autoFocus
                        />
                        <FormControl
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите фамилию актера"}
                            autoFocus
                        />
                        <FormControl
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите дату рождения актера"}
                            autoFocus
                        />
                        <FormControl
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите страну актера"}
                            autoFocus
                        />
                        <FormControl
                            value={height}
                            onChange={e => setHeight(e.target.value)}
                            style={{width: 700}}
                            placeholder={"Введите рост актера"}
                            autoFocus
                        />
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
                <Button variant="primary" onClick={addActor}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateActor;