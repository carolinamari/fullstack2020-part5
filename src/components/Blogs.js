import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Logout from './Logout'

const Blogs = (props) => {
    const sortedBlogs = props.blogs.sort((blog1, blog2) => {
        return blog2.likes - blog1.likes
    })

    return (
        <div>
            <h2>Blogs</h2>
            <p>{props.user.name} is logged in. <Logout handleLogout={props.handleLogout}/></p>
            <Togglable buttonLabel='Create new blog' ref={props.blogFormRef}>
                <BlogForm handleBlogCreation={props.handleBlogCreation}></BlogForm>
            </Togglable>
            <div className='blog-list'>
                { sortedBlogs.map(blog =>
                    <Blog key={blog.id} blog={blog} user={props.user}
                        handleLikeButton={props.handleLikeButton}
                        handleBlogRemoval={props.handleBlogRemoval}/>
                )}
            </div>
        </div>
    )
}

export default Blogs