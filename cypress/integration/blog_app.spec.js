describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            username: 'admin',
            name: 'Admin',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)

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
    })
})