describe('Login Page', () => {
    it('should navigate to login page and verify elements of login page', () => {
        cy.visit("/login")
        cy.getBySel('login-input-username').should('exist')
        cy.getBySel('login-input-password').should('exist')
        cy.getBySel('login-submit').should('have.text', "Se connecter")
    })
})

describe('Cart for connected user', () => {
    before( () => {
        cy.visit('/login')
        cy.getBySel('login-input-username').type('so@so.com')
        cy.getBySel('login-input-password').type('coucou')
        cy.getBySel('login-submit').click()
        cy.visit('/')
    })
    it('should find an add to cart button on product page', () => {
        cy.contains("Voir les produits").click()
        cy.getBySel('product-home-link').first().click()
        cy.wait(1000)
        cy.getBySel('detail-product-add').click()
        cy.wait(1000)
        cy.location().should((loc) => {
            expect(loc.href).to.include('cart')
        } )
    })

    after( () => {
        cy.getBySel('cart-line-delete').click({ multiple : true})
        cy.getBySel('nav-link-logout').click()
        cy.visit('/')
    })
})

describe('Availability field', () => {
    it('should exist on product page and report a good number ', () => {
        cy.visit('/')
        cy.getBySel('product-home-link').first().click()
        cy.getBySel('detail-product-stock').invoke('text').should('match', /^(0|[1-9][0-9]*) en stock$/)
    })
})