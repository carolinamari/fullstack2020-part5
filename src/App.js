import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  const handleTitleChange = ({ target }) => setNewBlogTitle(target.value)
  const handleAuthorChange = ({ target }) => setNewBlogAuthor(target.value)
  const handleURLChange = ({ target }) => setNewBlogURL(target.value)

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
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogURL
      }

      const addedBlog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogURL('')
    } catch (exception) {
      //
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
      <Notification message={errorMessage}/>
      { user === null ? 
        <Login handleLogin={handleLogin} username={username} password={password} 
               handleUsernameChange={handleUsernameChange} 
               handlePasswordChange={handlePasswordChange} 
        /> :
        <Blogs user={user} blogs={blogs} handleLogout={handleLogout}
               title={newBlogTitle} author={newBlogAuthor} url={newBlogURL}
               handleBlogCreation={handleBlogCreation} 
               handleTitleChange={handleTitleChange}
               handleAuthorChange={handleAuthorChange} 
               handleURLChange={handleURLChange}/>
      }
    </div>
  )
}

export default App