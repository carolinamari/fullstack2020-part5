import React from 'react'
import Blog from './Blog'

const Blogs = ({ user, blogs }) => {
    return (
        <div>
            <h2>Blogs</h2>
            <p>{user.name} is logged in.</p>
            { blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
        </div>
    )
}

export default Blogs