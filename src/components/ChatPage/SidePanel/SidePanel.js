import React from 'react'
import ChatRooms from './ChatRooms'
import DirectMessages from './DirectMessages'
import Favorited from './Favorited'
import UserPanel from './UserPanel'

function SidePanel(props) {
    return (
        <div style={{
            backgroundColor:"#7B83EB",
            padding:"2rem",
            minHeight:"100vh",
            color:"white",
        }}>
            <UserPanel currentUser={props.currentUser}/>
            <Favorited currentUser={props.currentUser}/>
            <ChatRooms/>
            <DirectMessages currentUser={props.currentUser}/>
        </div>
    )
}

export default SidePanel
