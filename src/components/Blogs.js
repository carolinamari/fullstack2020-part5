import React from 'react'
import Blog from './Blog'
import Logout from './Logout'

const Blogs = ({ user, blogs, handleLogout }) => {
    return (
        <div>
            <h2>Blogs</h2>
            <p>{user.name} is logged in. <Logout handleLogout={handleLogout}/></p>
            { blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
        </div>
    )
}

export default Blogs