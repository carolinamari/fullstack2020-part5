import React from 'react'

const BlogForm = ({ title, author, url, handleBlogCreation, handleTitleChange, handleAuthorChange, handleURLChange }) => {
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleBlogCreation}>
                <p>
                    Title: 
                    <input type="text" value={title} name="BlogTitle" onChange={handleTitleChange}></input>
                </p>
                <p>
                    Author: 
                    <input type="text" value={author} name="BlogAuthor" onChange={handleAuthorChange}></input>
                </p>
                <p>
                    URL: 
                    <input type="text" value={url} name="BlogURL" onChange={handleURLChange}></input>
                </p>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm