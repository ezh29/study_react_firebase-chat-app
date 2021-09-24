import React, { Component } from 'react'
import { FaRegSmileWink } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { Button, Modal, Form } from "react-bootstrap"
import { connect } from 'react-redux'
import firebase from 'firebase'
import { setCurrentChatRoom } from '../../../redux/actions/chatRoom_action'

export class ChatRooms extends Component {
    state = {
        show: false,
        name: "",
        description: "",
        chatRoomRef: firebase.database().ref("chatRooms"),
        chatRooms: [],
        firstLoad: true,
        activeChatRoomId: ""
    }

    componentDidMount() {
        this.AddChatRoomsListeners();
    }

    setFirstChatRoom = () => {
        const firstChatRoom = this.state.chatRooms[0]
        if (this.state.firstLoad && this.state.chatRooms.length > 0) {
            this.props.dispatch(setCurrentChatRoom(firstChatRoom))
            this.setState({ activeChatRoomId: firstChatRoom.id })
        }
        this.setState({ firstLoad: false })
    }

    AddChatRoomsListeners = () => {
        let chatRoomsArray = []
        this.state.chatRoomRef.on("child_added", DataSnapshot => {
            chatRoomsArray.push(DataSnapshot.val());
            this.setState({ chatRooms: chatRoomsArray }, () => this.setFirstChatRoom());
        })
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, description } = this.state;
        console.log("방정보", name, description);
        if (this.isFormValid(name, description)) {
            this.addChatRoom();
        }
    }
    //name,description이 있으면 트루 리턴
    isFormValid = (name, description) =>
        name && description;

    renderChatrooms = (chatRooms) =>
        chatRooms.length > 0 &&
        chatRooms.map(room => (< li key={room.id} style={{ backgroundColor: room.id === this.state.activeChatRoomId && "#ffffff45" }} onClick={() => this.changeChatRoom(room)} >#{room.name}</li >))

    changeChatRoom = (room) => {
        this.props.dispatch(setCurrentChatRoom(room))
        this.setState({ activeChatRoomId: room.id })
    }

    addChatRoom = async () => {
        //무작위로 키를 생성하기위해 .push().key
        //이 키는 아래에 새로운 채팅방 정보 넣을때도 사용됨
        const key = this.state.chatRoomRef.push().key;
        const { name, description } = this.state;
        const { user } = this.props;
        const newChatRoom = {
            id: key,
            name: name,
            description: description,
            createBy: {
                name: user.displayName,
                image: user.photoURL
            }
        };

        try {
            await this.state.chatRoomRef.child(key).update(newChatRoom);
            //전송 후 초기화
            this.setState({
                name: "",
                description: "",
                show: false
            })
        } catch (error) {
            alert(error)
        }
    }



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
                <ul style={{
                    listStyleType: 'none', padding: '0',
                }}>
                    {this.renderChatrooms(this.state.chatRooms)}
                </ul>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>방 만들기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>방 제목</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>설명</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.setState({ description: e.target.value })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            만들기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

//state에 들어있는것 props로 받기 위한 코드
//함수형이면 훅 사용하는데 클래스형이여서 connect 사용
const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}
export default connect(mapStateToProps)(ChatRooms)
