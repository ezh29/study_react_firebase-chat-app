import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Form, ProgressBar, Row, Col, Button } from 'react-bootstrap'
import firebase from 'firebase'

function MessageForm() {
    //메세지에 같이 보낼 user와 chatRoom 정보 리덕스에서 useSelector로 가져옴
    const user = useSelector(state => state.user.currentUser)
    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom)

    //이 화면에서 쓰일 state들
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const inputOpenImageRef = useRef()
    const storageRef = firebase.storage().ref()


    //파이어베이스 메세지 저장 경로
    const messageRef = firebase.database().ref("messages")

    //textarea 입력값 state로 저장하는 함수
    const handleChange = (event) => {
        setContent(event.target.value)
    }

    //파베로 보낼 메세지 형식 리턴 함수
    const createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                image: user.photoURL
            }
        }
        if (fileUrl !== null) {
            message["image"] = fileUrl;
        } else {
            message["content"] = content;
        }
        return message;
    }

    //전송 클릭시 파베로 메세지 보내는 함수
    const handleSubmit = async () => {
        //입력값없으면 에러만 셋하고 리턴
        if (!content) {
            setErrors(prev => prev.concat("메세지를 입력해 주세요"))
            setTimeout(() => {
                setErrors([]);
            }, 5000)
            return;
        }
        setLoading(true);

        //파베 통신, 통신후 에러,텍스트,로딩중 모두 초기화
        try {
            await messageRef.child(chatRoom.id).push().set(createMessage())
            setErrors([])
            setContent("")
            setLoading(false)
        } catch (error) {
            console.error(error);
            setErrors(prev => prev.concat(error.message))
            setLoading(false)
            setTimeout(() => {
                setErrors([]);
            }, 5000)
        }
    }

    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click()
    }
    //이미지 전송
    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const filePath = `/message/public/${file.name}`;
        const metadata = { contentType: file.type };

        try {
            setLoading(true)

            //이미지 스토리지에 저장
            let uploadTask = storageRef.child(filePath).put(file, metadata)
            //await 있으면 리스너 사용 불가, 빼기
            //let uploadTask = await storageRef.child(filePath).put(file, metadata)

            //파일 저장 퍼센티지 구하기
            uploadTask.on("state_changed",
                UploadTaskSnapshot => {
                    const percentage = Math.round(
                        (UploadTaskSnapshot.bytesTransferred / UploadTaskSnapshot.totalBytes) * 100
                    );
                    setPercentage(percentage);
                },
                err => {
                    setLoading(false)
                    console.error(err);
                },
                () => {
                    //저장이 다된 후에 파일 메세지 전송
                    //저장된 파일을 다운로드 받을 수 있는 URL 가져오기
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        messageRef.child(chatRoom.id).push().set(createMessage(downloadURL))
                        setLoading(false)
                    })
                }
            )
        } catch (error) {
            console.error(error);
            setErrors(prev => prev.concat(error.message))
            setLoading(false)
            setTimeout(() => {
                setErrors([]);
            }, 5000)
        }



    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control as="textarea" rows={3} value={content} onChange={handleChange} />
                </Form.Group>
            </Form>
            {!(percentage === 0 || percentage === 100) &&
                <ProgressBar className="mt-2" now={percentage} label={`${percentage}%`} variant="warning" />
            }
            <div>{errors.map(errorMsg => <p key={errorMsg}>{errorMsg}</p>)}</div>

            <Row className="mt-2">
                <Col>
                    <Button onClick={handleSubmit} variant="primary" size="lg" style={{ width: '100%' }} disabled={loading} >
                        보내기
                    </Button>
                </Col>
                <Col>
                    <Button onClick={handleOpenImageRef} variant="primary" size="lg" style={{ width: '100%' }} disabled={loading}>
                        업로드
                    </Button>
                </Col>
            </Row>
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

export default MessageForm
