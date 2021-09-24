import React, { Component } from 'react'
import { FaRegSmileWink } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { Button, Modal, Form } from "react-bootstrap"

export class ChatRooms extends Component {
    state = {
        show: false
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    render() {
        return (
            <div>
                <div style={{
                    position: 'relative', width: '100%', display: 'flex', alignItems: 'center'
                }}>
                    <FaRegSmileWink style={{ marginRight: 3 }} />
                    채팅방 {" "} ({ChatRooms.length})
                    <FaPlus style={{
                        position: 'absolute', right: 0, cursor: 'pointer'
                    }}
                        onClick={this.handleShow}
                    />
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>방 만들기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>방 제목</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>설명</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

export default ChatRooms
