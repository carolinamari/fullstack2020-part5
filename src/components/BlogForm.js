import React, { useState } from 'react'

const BlogForm = ({ handleBlogCreation }) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogURL, setNewBlogURL] = useState('')

    const handleTitleChange = ({ target }) => setNewBlogTitle(target.value)
    const handleAuthorChange = ({ target }) => setNewBlogAuthor(target.value)
    const handleURLChange = ({ target }) => setNewBlogURL(target.value)

    const addBlog = async (event) => {
        event.preventDefault()
    
        const newBlog = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogURL
        }

        handleBlogCreation(newBlog)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogURL('')       
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <p>
                    Title: 
                    <input type="text" value={newBlogTitle} name="BlogTitle" onChange={handleTitleChange}></input>
                </p>
                <p>
                    Author: 
                    <input type="text" value={newBlogAuthor} name="BlogAuthor" onChange={handleAuthorChange}></input>
                </p>
                <p>
                    URL: 
                    <input type="text" value={newBlogURL} name="BlogURL" onChange={handleURLChange}></input>
                </p>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm