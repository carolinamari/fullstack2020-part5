import React from 'react'

const Login = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <p>
                    Username:
                    <input id='username' type="text" value={username} name="Username" onChange={handleUsernameChange}></input>
                </p>
                <p>
                    Password:
                    <input id='password' type="password" value={password} name="Password" onChange={handlePasswordChange}></input>
                </p>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login