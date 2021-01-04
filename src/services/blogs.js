import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newValue) => {
  token = `bearer ${newValue}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { setToken, getAll, addBlog }