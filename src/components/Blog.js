import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikeButton, handleBlogRemoval }) => {
    const [visible, setVisibility] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const allowRemoval = { display: blog.userId.username === user.username ? '' : 'none' }

    const toggleVisibility = () => {
        setVisibility(!visible)
    }

    const likeBlog = () => {
        const updatedBlog = {
            userId: blog.userId.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }

        handleLikeButton(blog.id, updatedBlog)
    }

    const removeBlog = () => {
        const confirmDelete = window.confirm(`Remove '${blog.title}' by ${blog.author}?`)

        if (confirmDelete) {
            handleBlogRemoval(blog)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className='blog'>
            <h4>
                {blog.title} {blog.author}
            </h4>
            <button id='view-button' style={hideWhenVisible} onClick={toggleVisibility}>View</button>
            <div style={showWhenVisible} className='togglableContent'>
                <p>URL: {blog.url}</p>
                <p className='likes'>Likes: {blog.likes} <button id='like-button' onClick={likeBlog}>Like</button></p>
                <p>Added by: {blog.userId.name}</p>
                <p style={allowRemoval}>
                    <button id='remove-button' onClick={removeBlog}>Remove</button>
                </p>
                <button id='hide-button' onClick={toggleVisibility}>Hide</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleLikeButton: PropTypes.func.isRequired,
    handleBlogRemoval: PropTypes.func.isRequired
}

export default Blog
