describe('display of products on home page', () => {
    it('should display list of products on home page', () => {
        cy.visit('/')
        cy.getBySel('product-home').each(() => {
            cy.getBySel('product-home-img').should('exist')
            cy.getBySel('product-home-name').should('exist')
            cy.getBySel('product-home-ingredients').should('exist')
            cy.getBySel('product-home-price').should('exist')
            cy.getBySel('product-home-link').should('exist')
        })
    })    
})





