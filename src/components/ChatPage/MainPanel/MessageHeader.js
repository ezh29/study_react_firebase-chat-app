import React from 'react'
import { useSelector } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, Image, Accordion } from 'react-bootstrap'
import { FaLock } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'

function MessageHeader({ handleSearchChange }) {

    const user = useSelector(state => state.user.currentUser)



    return (
        <div style={{ width: '100%', height: '170px', border: '.2rem solid @ececec', borderRadius: '4px', padding: '1rem', marginBottom: '1rem' }}>
            <Container>
                <Row>
                    <Col> <h2><FaLock /> 방이름 <MdFavorite /></h2></Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><AiOutlineSearch /></InputGroup.Text>
                            <FormControl
                                //글자 칠때마다 props로 받은 handleSearchChange함수 실행
                                onChange={handleSearchChange}
                                placeholder="Search Messages"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image src={user && user.photoURL}
                        roundedCircle
                        style={{ width: '30px', height: '30px', marginTop: '3px' }}
                    />
                    {user && user.displayName}
                </div>
                <Row>
                    <Col>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                    est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                    est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default MessageHeader
