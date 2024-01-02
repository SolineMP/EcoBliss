import { faker } from '@faker-js/faker'
const negativeNumber = faker.datatype.number({ min: -10, max: -1 }).toString();
const apiUrl = Cypress.env("apiUrl")
describe('Cart tests', () => {
    beforeEach(() => {
        cy.Connect()
        cy.url().should('include', '/');
    })
    it('should add a product with valid stock in the cart and update stock', () => {
        cy.getBySel('product-home-link').first().click();
      
        cy.url().then((productPage) => {
          cy.log(productPage);  
          cy.getBySel('detail-product-stock')
            .invoke('text')
            .should('match', /^(0|[1-9][0-9]*) en stock$/)
            .then((text) => {
              const stockText = text.trim();
              const stockNumber = parseInt(stockText.match(/\d+/));
              cy.log(`Stock initial: ${stockNumber}`);
      
              cy.getBySel('detail-product-add').click(); 
              cy.visit(productPage); 
              cy.reload();      
              const newStock = stockNumber - 1;
              cy.getBySel('detail-product-stock')
                .invoke('text')
                .should('match', new RegExp(`^${newStock} en stock$`));
            });
        });
        cy.visit('/cart')
        cy.getBySel('cart-line-delete').click({ multiple : true })
      });

    it('shouldn\'t change the cart with negative number', () => {
      cy.getBySel('product-home-link').first().click();
      cy.getBySel('detail-product-quantity').clear().type(negativeNumber);
      cy.getBySel('detail-product-add').click();
      cy.getBySel('detail-product-form').should('have.class', 'ng-invalid');
    });
    
    it('should adds a product to the cart and shows up in the API', () => {
      let id;
      cy.getBySel('product-home-link').first().click()
      
      cy.url().then(url => {
        const segments = url.split('/') 
        id = parseInt(segments[segments.length - 1]);
        cy.log(id)
    
        cy.wait(2000);

        cy.contains('[data-cy="detail-product-add"]', 'Ajouter au panier').click();
    
        cy.getToken().then((token) => {
          cy.request({
            method: 'GET',
            url: apiUrl + '/orders',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            cy.log(response.body.orderLines[0].product.id);
            const idInApi = response.body.orderLines[0].product.id
            expect(idInApi).to.equal(id);
          });
        });
      })
      cy.visit('/cart')
      cy.getBySel('cart-line-delete').click({ multiple : true })
    });
     
    it('shouldn\'t change the cart with 20+ number', () => {
      cy.getBySel('product-home-link').first().click()
      cy.getBySel('detail-product-quantity').clear().type(21)
      cy.getBySel('detail-product-add').click()
      cy.getBySel('detail-product-form').should('have.class', 'ng-invalid')
    })
  })
         