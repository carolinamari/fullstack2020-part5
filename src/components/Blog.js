import React, { useState } from 'react'

const Blog = ({ blog, handleLikeButton }) => {
    const [visible, setVisibility] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none'}
    const hideWhenVisible = { display: visible ? 'none' : ''}

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

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    
    return (
        <div style={blogStyle}>
            <h4>{blog.title} {blog.author}</h4>
            <button style={hideWhenVisible} onClick={toggleVisibility}>View</button>
            <div style={showWhenVisible}>
                <p>URL: {blog.url}</p>
                <p>Likes: {blog.likes} <button onClick={likeBlog}>Like</button></p>
                <p>Added by: {blog.userId.name}</p>
                <button onClick={toggleVisibility}>Hide</button>
            </div>
        </div>
    )
}

export default Blog
