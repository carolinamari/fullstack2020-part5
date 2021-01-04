import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Logout from './Logout'

const Blogs = (props) => {
    return (
        <div>
            <h2>Blogs</h2>
            <p>{props.user.name} is logged in. <Logout handleLogout={props.handleLogout}/></p>
            <BlogForm title={props.title} author={props.author} url={props.url}
                    handleBlogCreation={props.handleBlogCreation} 
                    handleTitleChange={props.handleTitleChange}
                    handleAuthorChange={props.handleAuthorChange} 
                    handleURLChange={props.handleURLChange}>
            </BlogForm>
            { props.blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
        </div>
    )
}

export default Blogs