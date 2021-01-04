import React from 'react'

const defaultStyle = {
    color: '#FF9674',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
}

const Notification = ({ message, customStyle }) => {
    const style = customStyle ? customStyle : defaultStyle
    if (message) {
        return (
            <div style={style}>
                {message}
            </div>
        )
    }

    return null
}

export default Notification