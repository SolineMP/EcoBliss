import { faker } from '@faker-js/faker'
const negativeNumber = faker.datatype.number({ min: -10, max: -1 }).toString();
describe('Cart tests', () => {
    beforeEach(() => {
        cy.Connect()
        cy.url().should('include', '/');
    })
    // it('should add a product with valid stock in the cart and update stock', () => {
    //     cy.getBySel('product-home-link').first().click();
      
    //     cy.url().then((productPage) => {
    //       cy.log(productPage);  
    //       cy.getBySel('detail-product-stock')
    //         .invoke('text')
    //         .should('match', /^(0|[1-9][0-9]*) en stock$/)
    //         .then((text) => {
    //           const stockText = text.trim();
    //           const stockNumber = parseInt(stockText.match(/\d+/));
    //           cy.log(`Stock initial: ${stockNumber}`);
      
    //           cy.getBySel('detail-product-add').click(); 
    //           cy.visit(productPage); 
    //           cy.reload();      
    //           const newStock = stockNumber - 1;
    //           cy.getBySel('detail-product-stock')
    //             .invoke('text')
    //             .should('match', new RegExp(`^${newStock} en stock$`));
    //         });
    //     });
    //   });

    //   it('shouldn\'t change the cart with negative number ', () => {
    //     cy.getBySel('product-home-link').first().click()
    //     cy.getBySel('detail-product-quantity').clear().type(negativeNumber)
    //     cy.getBySel('detail-product-add').click()
    //     cy.getBySel('detail-product-form').should('have.class', 'ng-invalid')    
    //   })

    //   it('shouldn\'t change the cart with 20+ number', () => {
    //     cy.getBySel('product-home-link').first().click()
    //     cy.getBySel('detail-product-quantity').clear().type(21)
    //     cy.getBySel('detail-product-add').click()
    //     cy.getBySel('detail-product-form').should('have.class', 'ng-invalid')  
    //   })

      it('should add a product to the cart and show up in the API', () => {
        cy.getBySel('product-home-link').first().click()
        cy.url().then(url => {
            const id = new URL(url).searchParams.get('id')
            cy.log(id)

        })

        // cy.getBySel('detail-product-add').click()


      })

    // after(() => {
    //     cy.visit('/cart')
    //     cy.getBySel('cart-line-delete').click({ multiple : true })
    // })  
    })
         