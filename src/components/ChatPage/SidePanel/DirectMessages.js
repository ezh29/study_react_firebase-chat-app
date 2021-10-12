import React, { Component } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import firebase from 'firebase'
import { connect } from 'react-redux' //class 라서 훅 못쓰고 맨 아래에서 connect해서 리덕스 값 가져와야함
import { setCurrentChatRoom, setPrivateChatRoom } from '../../../redux/actions/chatRoom_action'

export class DirectMessages extends Component {

    state = {
        usersRef: firebase.database().ref("users"),
        users: [],
        activeChatRoom: ""
    }

    componentDidMount() {
        //맨 아래connect로 리덕스 값을 props로 받아와서 사용함
        if (this.props.user) {
            this.addUserListeners(this.props.user.uid)
        }
    }

    addUserListeners = (currentUserId) => {
        const { usersRef } = this.state;
        let usersArray = [];
        usersRef.on("child_added", DataSnapshot => {
            if (currentUserId !== DataSnapshot.key) {
                let user = DataSnapshot.val()
                user["uid"] = DataSnapshot.key
                user["status"] = "offline"
                usersArray.push(user)
                this.setState({ users: usersArray })
            }
        })
    }

    //다이렉트 채팅방 아이디 생성
    getChatRoomId = (userId) => {
        const currentUserId = this.props.user.uid
        return userId > currentUserId
            ? `${userId}/${currentUserId}`
            : `${currentUserId}/${userId}`
    }
    //getChatRoomId에서 만든 채팅방 아이디를 리덕스에 저장함
    changeChatRoom = (user) => {
        const chatRoomId = this.getChatRoomId(user.uid);
        const chatRoomData = {
            id: chatRoomId,
            name: user.name
        }
        //리덕스 액션 사용해서 CurrentChatRoom 셋팅
        this.props.dispatch(setCurrentChatRoom(chatRoomData))
        //private방임을 리덕스에 저장
        this.props.dispatch(setPrivateChatRoom(true));
        this.setActiveChatRoom(user.uid);
    }

    setActiveChatRoom = (userId) => {
        this.setState({ activeChatRoom: userId })
    }

    renderDirectMessages = users =>
        users.length > 0 &&
        users.map(user => (<li key={user.uid} style={{ backgroundColor: user.uid === this.state.activeChatRoom && "#ffffff45" }} onClick={() => this.changeChatRoom(user)}># {user.name}</li>))

    render() {

        const { users } = this.state;
        console.log("users", this.state)
        return (
            <div>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <FaRegSmile style={{ margin: 3 }} /> DirectMessages (1)
                </span>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {this.renderDirectMessages(users)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
    }
}

export default connect(mapStateToProps)(DirectMessages)
