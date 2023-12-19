describe('navigate to the home page', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains("Voir les produits").click()
  })
})
