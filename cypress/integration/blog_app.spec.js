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
})