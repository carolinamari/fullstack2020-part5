import React from 'react'

const Logout = ({ handleLogout }) => {
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout