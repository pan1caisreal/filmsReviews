import React, {useState,useContext} from 'react';
import {Button, Dropdown, Form, FormControl, FormGroup, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {UpdatePostUser} from "../../http/ReviewApi";

const UpdatePost = observer(({show,onHide,postId}) => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const {films} = useContext(Context)

    const UpdatePost = () =>{
        const formData = new FormData()
        formData.append('title',title)
        formData.append('content',content)
        formData.append('estimation', films.selectedEstimate.name)
        UpdatePostUser(postId,formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Изменить рецензию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup className="mb-3">
                        <Dropdown className="mt-2 mb-2 dropdown" style={{marginLeft:20}}>
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
                        <FormControl
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            style={{width: 400}}
                            placeholder={"Заголовок"}
                            autoFocus
                        />
                        <textarea
                            style={{resize:"none", height:300,width: 400,marginLeft:17}}
                            className="form-control"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Текст"
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={UpdatePost} >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdatePost;