const apiUrl = Cypress.env("apiUrl")
const username = Cypress.env("username")
const password = Cypress.env("password")
describe('order API', () => {
    before(() => {
            cy.request({
               method: "POST",
               url: apiUrl +  "/login",
               body: {
                "username" : username,
                "password" : password,
               }
            }).then((response) => {
                Cypress.env('token', response.body.token)
                expect(response.status).to.eq(200);
            })
    })
    it('should returns 401 if the user is not connected', () => {
        cy.request({
            method: "GET",
            url: apiUrl + "/orders", 
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })
    it('should returns a list of products in the cart', () => {
        cy.request({
            method: "GET", 
            url: apiUrl + "/orders",
            headers: {
                "Authorization" : "Bearer " + Cypress.env('token'),
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).exist
        })
    }) 
})
