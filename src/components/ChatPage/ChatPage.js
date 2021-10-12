import React from "react";
import SidePanel from "./SidePanel/SidePanel";
import MainPanel from "./MainPanel/MainPanel";
import { useSelector } from 'react-redux'

function ChatPage() {
  const currentChatRoom = useSelector(state => state.chatRoom.currentChatRoom)
  const currentUser = useSelector(state => state.user.currentUser)
  return <div style={{ display: 'flex' }}>
    <div style={{ width: '300px' }}>
      {/* SidePanel > DirectMessages의 componentDidMount가 redux update를 인식 못해서 키값 내려줘서 다시 랜더함 */}
      <SidePanel key={currentUser && currentUser.uid} />
    </div>
    <div style={{ width: '100%' }}>
      <MainPanel key={currentChatRoom && currentChatRoom.id} />
    </div>
  </div>;
}
export default ChatPage;
