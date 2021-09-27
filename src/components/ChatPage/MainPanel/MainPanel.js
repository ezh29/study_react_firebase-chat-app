import React, { Component } from 'react'
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import firebase from 'firebase'
import { connect } from 'react-redux'
import Message from './Message'

export class MainPanel extends Component {
    state = {
        messages: [],
        messagesRef: firebase.database().ref("messages"),
        messagesLoading: true
    }

    componentDidMount() {
        //아래 connect에서 prop으로 받아온 chatRoom state 사용
        const { chatRoom } = this.props;
        if (chatRoom) {
            this.addMessagesListeners(chatRoom.id)
        }

    }

    addMessagesListeners = (chatRoomId) => {
        console.log("chatRoomId", chatRoomId)
        let messagesArray = [];
        this.setState({ messages: [] });
        this.state.messagesRef.child(chatRoomId).on("child_added",
            DataSnapshot => {
                messagesArray.push(DataSnapshot.val());
                this.setState({
                    messages: messagesArray,
                    messageLoading: false
                })
            })
    }

    renderMessages = messages =>
        messages.length > 0 &&
        messages.map(message => (
            <Message key={message.timestamp} message={message} user={this.props.user} />
        ));


    render() {
        const { messages } = this.state;
        return (
            <div style={{ padding: "2rem" }}>
                <MessageHeader />
                <div style={{
                    width: '100%',
                    height: '450px',
                    border: '.2rem solid #ececec',
                    padding: '1rem',
                    marginBottom: '1rem',
                    overflowY: 'auto'
                }}>
                    {this.renderMessages(messages)}
                </div>
                <MessageForm />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
        chatRoom: state.chatRoom.currentChatRoom
    }
}
//connect를 사용하여 state로 된 것을 prop으로 가져올것임
export default connect(mapStateToProps)(MainPanel)
