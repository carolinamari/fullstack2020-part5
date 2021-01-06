import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with the right details', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm handleBlogCreation={createBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'Blog form component testing' }
    })
    fireEvent.change(author, {
        target: { value: 'React testing library' }
    })
    fireEvent.change(url, {
        target: { value: 'www.reactTestingLibrary.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blog form component testing')
    expect(createBlog.mock.calls[0][0].author).toBe('React testing library')
    expect(createBlog.mock.calls[0][0].url).toBe('www.reactTestingLibrary.com')
})