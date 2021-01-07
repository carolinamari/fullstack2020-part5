describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        cy.addUser({
            username: 'admin',
            name: 'Admin',
            password: 'password'
        })

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('form').find('#username').should('not.have.css', 'display', 'none')
        cy.get('form').find('#password').should('not.have.css', 'display', 'none')
    })

    describe('Login', function() {
        it('Succeeds with correct credentials', function() {
            cy.get('#username').type('admin')
            cy.get('#password').type('password')
            cy.get('#login-button').click()

            cy.contains('Admin is logged in')
        })

        it('Fails with wrong credentials', function() {
            cy.get('#username').type('admin')
            cy.get('#password').type('123')
            cy.get('#login-button').click()

            cy.get('.notification')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 150, 116)')

            cy.get('html').should('not.contain', 'Admin is logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'admin', password: 'password' })
        })

        it('A blog can be created', function() {
            cy.contains('Create new blog').click()
            cy.get('#title').type('New blog')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('https://docs.cypress.io')
            cy.get('#create-blog-button').click()

            cy.get('.notification').contains("A new blog 'New blog' by Cypress added!")
            cy.contains('New blog Cypress').parent().find('#view-button').click()
            cy.contains('URL: https://docs.cypress.io')
        })

        it('A blog can be liked', function() {
            cy.createBlog({
                blogTitle: 'New blog',
                blogAuthor: 'Cypress',
                blogUrl: 'https://docs.cypress.io'
            })

            cy.contains('New blog Cypress').parent().find('#view-button').click()
            cy.contains('New blog Cypress').parent().find('#like-button').click()
            cy.contains('New blog Cypress').parent().contains('Likes: 1')
        })

        describe('Deleting blogs', function() {
            beforeEach(function() {
                cy.createBlog({
                    blogTitle: 'New blog',
                    blogAuthor: 'Cypress',
                    blogUrl: 'https://docs.cypress.io'
                })
            })

            it('The user who created a blog can delete it', function() {
                cy.contains('New blog Cypress').parent().find('#view-button').click()
                cy.contains('New blog Cypress').parent().find('#remove-button').click()
                cy.on('window:confirm', function() { true })

                cy.get('.notification')
                    .should('contain', "The blog 'New blog' by Cypress was removed!")
                    .and('have.css', 'color', 'rgb(196, 255, 122)')
                cy.get('html').should('not.contain', 'New blog Cypress')
            })

            it('The user who did not create the blog cannot delete it', function() {
                cy.contains('Logout').click()

                cy.addUser({
                    username: 'anotherUser',
                    name: 'User 2',
                    password: 'password'
                })

                cy.login({ username: 'anotherUser', password: 'password' })
                cy.contains('New blog Cypress').parent().find('#view-button').click()
                cy.contains('New blog Cypress').parent().find('#remove-button').parent().should('have.css', 'display', 'none')
            })
        })
    })
})