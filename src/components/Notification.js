import React from 'react'

const Notification = ({ message, customStyle }) => {
    if (message) {
        return (
            <div style={customStyle}>
                {message}
            </div>
        )
    }

    return null
}

export default Notification