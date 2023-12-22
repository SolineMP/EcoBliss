const username = Cypress.env("username")
const password = Cypress.env("password")

describe('Login and Logout', () => {
    it('should connect the user', () => {
        cy.visit('/login')
        cy.getBySel('login-input-username').type(username),
        cy.getBySel('login-input-password').type(password),
        cy.getBySel('login-submit').click()
        cy.getBySel('nav-link-cart').should('have.text', "Mon panier")
        cy.getBySel('nav-link-logout').should('exist')
        cy.getBySel('nav-link-logout').click()
        cy.getBySel('nav-link-logout').should('not.exist')
    })
})