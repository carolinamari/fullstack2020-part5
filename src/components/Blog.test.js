import React from 'react'
import '@testing-library/jest-dom/extend-expect'
//import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component, mockLikeHandler, mockBlogRemovalHandler

    beforeEach(() => {
        const blog = {
            userId: {
                id: '123456789',
                username: 'carolinamari',
                name: 'Carolina'
            },
            likes: 100,
            author: 'React testing library',
            title: 'Blog component testing',
            url: 'www.testing.com'
        }

        const user = {
            username: 'carolinamari',
            name: 'Carolina',
            id: '123456789'
        }

        mockLikeHandler = jest.fn()
        mockBlogRemovalHandler = jest.fn()

        component = render(
            <Blog blog={blog} user={user} handleLikeButton={mockLikeHandler} handleBlogRemoval={mockBlogRemovalHandler}/>
        )
    })

    test('Only renders title and author by default', () => {
        expect(component.container.querySelector('h4')).not.toHaveStyle('display: none')
        expect(component.container.querySelector('.togglableContent')).toHaveStyle('display: none')
    })

    test('After clicking the view button, the details are shown', () => {
        const viewButton = component.getByText('View')
        fireEvent.click(viewButton)

        expect(component.container.querySelector('.togglableContent')).not.toHaveStyle('display: none')
    })

    test('Clicking the like button twice calls the like event handler twice', () => {
        const likeButton = component.getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
})