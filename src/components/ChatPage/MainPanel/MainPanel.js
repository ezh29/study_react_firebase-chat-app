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
        messagesLoading: true,
        //메세지 검색에 필요한 state
        searchTerm: "",
        searchResults: [],
        searchLoading: false

    }

    componentDidMount() {
        //아래 connect에서 prop으로 받아온 chatRoom state 사용
        const { chatRoom } = this.props;
        if (chatRoom) {
            this.addMessagesListeners(chatRoom.id)
        }

    }

    handleSearchMessages = () => {
        const chatRoomMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, "gi");
        //전체 메세지에서 정규식 맞는것만 acc에 축적해서 return
        const searchResults = chatRoomMessages.reduce((acc, message) => {
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                acc.push(message);
            }
            return acc;
        }, []);
        this.setState({ searchResults });
        setTimeout(() => this.setState({ searchLoading: false }), 1000);
    }

    //MessageHeader에 props로 내려줄 함수
    handleSearchChange = event => {
        //타자 친것 searchTerm에 저장
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        },
            //실제 채팅 검색 시작
            () => this.handleSearchMessages()
        )

    }

    addMessagesListeners = (chatRoomId) => {
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
        const { messages, searchTerm, searchResults } = this.state;
        return (
            <div style={{ padding: "2rem" }}>
                <MessageHeader handleSearchChange={this.handleSearchChange} />
                <div style={{
                    width: '100%',
                    height: '450px',
                    border: '.2rem solid #ececec',
                    padding: '1rem',
                    marginBottom: '1rem',
                    overflowY: 'auto'
                }}>
                    {searchTerm ? this.renderMessages(searchResults) : this.renderMessages(messages)}
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
