import React from 'react'
import { IoIosChatboxes } from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux'

function UserPanel() {
    const user = useSelector(state => state.user.currentUser)

    return (
        <div>
            <h3><IoIosChatboxes /> chat app</h3>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <Image src={user && user.photoURL}
                    roundedCircle
                    style={{ width: '30px', height: '30px', marginTop: '3px' }}
                />
                <Dropdown>
                    <Dropdown.Toggle
                        style={{ background: 'transparent', border: '0' }}
                        id="dropdown-basic">
                        {user.displayName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item >프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item >로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default UserPanel
