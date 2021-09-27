import React from 'react'
import { Image } from 'react-bootstrap'
import moment from 'moment'

function Message({ message, user }) {

    const timeFromNow = timestamp => moment(timestamp).fromNow();

    const isImage = message => {
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    }

    return (
        <div>
            <Image src={message.user.image}
                roundedCircle
                style={{ width: '30px', height: '30px', marginTop: '3px' }}
            />
            <p>{message.user.name}/ {timeFromNow(message.timestamp)} </p>
            {isImage(message) ?
                <img style={{ maxWidth: '300px' }} alt="이미지" src={message.image} />
                : <p>{message.content}  </p>
            }

        </div>
    )
}

export default Message
