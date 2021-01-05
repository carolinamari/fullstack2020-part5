import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Logout from './Logout'

const Blogs = (props) => {
    return (
        <div>
            <h2>Blogs</h2>
            <p>{props.user.name} is logged in. <Logout handleLogout={props.handleLogout}/></p>
            <Togglable buttonLabel='Create new blog' ref={props.blogFormRef}>
                <BlogForm handleBlogCreation={props.handleBlogCreation}></BlogForm>
            </Togglable>
            { props.blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
        </div>
    )
}

export default Blogs