describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('form').find('#username').should('not.have.css', 'display', 'none')
        cy.get('form').find('#password').should('not.have.css', 'display', 'none')
    })
})