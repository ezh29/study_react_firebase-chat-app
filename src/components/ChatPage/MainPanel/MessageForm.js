import React from 'react'
import { Form, ProgressBar, Row, Col, Button } from 'react-bootstrap'

function MessageForm() {
    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>

            <ProgressBar className="mt-2" now={60} label={`60%`} variant="warning" />

            <Row className="mt-2">
                <Col>
                    <Button variant="primary" size="lg" style={{ width: '100%' }}>
                        보내기
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" style={{ width: '100%' }}>
                        업로드
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default MessageForm
