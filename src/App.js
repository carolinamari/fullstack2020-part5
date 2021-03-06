import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationStyle, setNotificationStyle] = useState(null)

    const sucessStyle = {
        color: '#C4FF7A',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center'
    }

    const errorStyle = {
        color: '#FF9674',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlign: 'center'
    }

    const blogFormRef = useRef()

    const handleUsernameChange = ({ target }) => setUsername(target.value)
    const handlePasswordChange = ({ target }) => setPassword(target.value)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const loggedInUser = await loginService.login({ username, password })

            window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
            blogService.setToken(loggedInUser.token)

            setUser(loggedInUser)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotificationStyle(errorStyle)
            setNotificationMessage('Wrong credentials')
            setTimeout(() => setNotificationMessage(null), 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const handleBlogCreation = async (newBlog) => {

        try {
            const addedBlog = await blogService.addBlog(newBlog)
            setBlogs(blogs.concat(addedBlog))
            blogFormRef.current.toggleVisibility()
            setNotificationStyle(sucessStyle)
            setNotificationMessage(`A new blog '${addedBlog.title}' by ${addedBlog.author} added!`)
            setTimeout(() => setNotificationMessage(null), 5000)
        } catch (exception) {
            console.log(exception)

            setNotificationStyle(errorStyle)
            setNotificationMessage('A problem occured while trying to add new blog.')
            setTimeout(() => setNotificationMessage(null), 5000)
        }
    }

    const handleLikeButton = async (id, blog) => {
        try {
            const updatedBlog = await blogService.updateBlog(id, blog)
            setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))

            setNotificationStyle(sucessStyle)
            setNotificationMessage(`The blog '${updatedBlog.title}' by ${updatedBlog.author} was updated!`)
            setTimeout(() => setNotificationMessage(null), 5000)
        } catch (exception) {
            console.log(exception)

            setNotificationStyle(errorStyle)
            setNotificationMessage('A problem occured while trying to like the blog.')
            setTimeout(() => setNotificationMessage(null), 5000)
        }
    }

    const handleBlogRemoval = async (blogToRemove) => {
        try {
            await blogService.deleteBlog(blogToRemove.id)
            setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))

            setNotificationStyle(sucessStyle)
            setNotificationMessage(`The blog '${blogToRemove.title}' by ${blogToRemove.author} was removed!`)
            setTimeout(() => setNotificationMessage(null), 5000)
        } catch (exception) {
            console.log(exception)

            setNotificationStyle(errorStyle)
            setNotificationMessage('A problem occured while trying to remove the blog.')
            setTimeout(() => setNotificationMessage(null), 5000)
        }
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
        }
    }, [])

    return (
        <div>
            <Notification message={notificationMessage} customStyle={notificationStyle}/>
            { user === null ?
                <Login handleLogin={handleLogin} username={username} password={password}
                    handleUsernameChange={handleUsernameChange}
                    handlePasswordChange={handlePasswordChange}
                /> :
                <Blogs user={user} blogs={blogs} handleLogout={handleLogout} blogFormRef={blogFormRef}
                    handleBlogCreation={handleBlogCreation} handleLikeButton={handleLikeButton}
                    handleBlogRemoval={handleBlogRemoval}/>
            }
        </div>
    )
}

export default App