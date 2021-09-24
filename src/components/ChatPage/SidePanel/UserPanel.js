import React, { useRef } from 'react'
import { IoIosChatboxes } from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useSelector, useDispatch } from 'react-redux';
import { setPhotoURL } from "../../../redux/actions/user_action";

import firebase from 'firebase';

function UserPanel() {
    let dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser)

    const inputOpenImageRef = useRef();

    const handleLogout = () => {
        firebase.auth().signOut();
    }

    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click()
    }

    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const metadata = { contentType: file.type };
        try {
            //스토리지에 파일 저장
            let uploadTaskSnapshot = await firebase.storage().ref().child(`user_image/${user.uid}`).put(file, metadata)

            let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
            //프로필 수정
            firebase.auth().currentUser.updateProfile({ photoURL: downloadURL });
            //바뀐 이미지로 보여주기 (리덕스에서 유저이미지 교체)
            dispatch(setPhotoURL(downloadURL))
            //데이터베이스 수정
            firebase.database().ref("users").child(user.uid).update({ image: downloadURL })

        } catch {

        }

    }

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
                        {user && user.displayName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} >로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <input
                type="file"
                accept="image/jpeg, image/png"
                ref={inputOpenImageRef}
                style={{ display: "none" }}
                onChange={handleUploadImage}
            />
        </div>
    )
}

export default UserPanel
