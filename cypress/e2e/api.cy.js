import { faker } from '@faker-js/faker'

const apiUrl = Cypress.env("apiUrl")
const username = Cypress.env("username")
const password = Cypress.env("password")
describe('Orders API', () => {
    before(() => {
        // Supprimer le token d'accès après chaque test
            Cypress.env('token', null);
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
    it('should returns 403 if the user is not connected', () => {
        cy.request({
            method: "GET",
            url: apiUrl + "/orders", 
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(403)
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

    context("should adds a product in the cart, update quantity and delete him", () => {
        const randomQuantity = faker.number.int({ min : 1, max: 10 })
        let productId; 
        let cartId;
        it('should returns a random product', () => {
            cy.request({
                method: 'GET',
                url: "http://localhost:8081/products/",
                headers: {
                    "Authorization": "Bearer " + Cypress.env('token')
                }
            }).then((response) => {
                productId = response.body[Math.floor(Math.random() * response.body.length)].id;
            })
        })

        it('should adds the product in the cart', () => {
            cy.request({
                method: 'POST', 
                url: apiUrl + "/orders/add",
                headers: {
                    "Authorization" : "Bearer " + Cypress.env('token')
                },
                body: {
                    "product" : productId,
                    "quantity" : randomQuantity,
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                cartId = response.body.orderLines[0].id
            })
        })

        it('should changes the quantity of the product order', () => {
            cy.request({
                method: "PUT", 
                url: apiUrl + `/orders/${cartId}/change-quantity`,
                headers: {
                    "Authorization" : "Bearer " + Cypress.env("token")
                },
                body: {
                    'quantity' : 2
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('should empty the cart', () => {
            cy.request({
                method: 'DELETE',
                url: apiUrl + `/orders/${cartId}/delete`,
                headers: {
                    "Authorization" : "Bearer " + Cypress.env('token')
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
            })
        })
    })

    it('should not add an out of stock product in the cart', () => {
        cy.request({
            method: "POST",
            failOnStatusCode: false,
            url: apiUrl + "/orders/add", 
            headers: {
                "Authorization" : "Bearer " + Cypress.env('token')
            }, 
            body: {
                "product" : 3, 
                "quantity" : 1, 
            }
        }).then((response) => {
            expect(response.status).to.eq(405)
        })
    })
})

describe('Products API', () => {
    let productId;

    before(() => {
        // Supprimer le token d'accès après chaque test
        Cypress.env('token', null);
        cy.request({
            method: "POST",
            url: apiUrl + "/login",
            body: {
                "username": username,
                "password": password,
            }
        }).then((response) => {
            Cypress.env('token', response.body.token)
            expect(response.status).to.eq(200)
        })
    })

    beforeEach(() => {
        // Récupérer les produits à chaque test
        cy.request({
            method: 'GET',
            url: "http://localhost:8081/products/",
            headers: {
                "Authorization": "Bearer " + Cypress.env('token')
            }
        }).then((response) => {
            productId = response.body[Math.floor(Math.random() * response.body.length)].id;
            cy.log(response.body)
            cy.log(productId)
        })
    })

    it('should return details of a product by ID', () => {
        expect(productId).to.be.a("number");
    
        cy.request("http://localhost:8081/products/" + `${productId}`)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property("name");
                expect(response.body).to.have.property("availableStock")
                cy.visit('/products/'+ productId)
                cy.contains(response.body.name)
                cy.contains(response.body.availableStock)
                cy.contains(response.body.skin)
                cy.contains(response.body.aromas)
                cy.contains(response.body.ingredients)
                cy.contains(response.body.description)
                const priceFromAPI = response.body.price.toString();
                cy.contains(new RegExp(priceFromAPI.replace('.', '\\.') + '|' + priceFromAPI.replace('.', ',')));
                cy.getBySel('detail-product-img').should('have.attr', 'src', response.body.picture)
                // A revoir car varieties est dans la response mais elle n'apparaît jamais sur la fiche.
                // cy.contains(response.body.varieties)
            });
    });
    
    

})

describe('Login API', () => {
    const fakeUsername = faker.internet.email()
    const fakePassword = faker.internet.password()
    it('should returns 401 in case of error', () => {
        cy.request({
            method: 'POST', 
            url: apiUrl + '/login',
            failOnStatusCode: false, 
            body: {
                username: fakeUsername,
                password: fakePassword,
            }, 
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('should returns 200 if the user is registered', () => {
        cy.request({
            method: 'POST',
            url: apiUrl + '/login',
            body: {
                username: username, 
                password: password,
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

})

describe('Reviews API', () => {
    const normalReview = faker.lorem.lines(2)
    const normalRate = faker.number.int({ min: 0, max: 5})
    const normalTitle = faker.lorem.words(3)

    before(() => {
        // Supprimer le token d'accès après chaque test
        Cypress.env('token', null);
        cy.request({
            method: "POST",
            url: apiUrl + "/login",
            body: {
                "username": username,
                "password": password,
            }
        }).then((response) => {
            Cypress.env('token', response.body.token)
            expect(response.status).to.eq(200)
        })
    })
    it('should adds a review', () => {
        cy.request({
            method: 'POST',
            url: apiUrl + "/reviews", 
            headers: {
                "Authorization" : "Bearer " + Cypress.env('token') 
            },
            body: {
                "title": normalTitle,
                "comment": normalReview,
                "rating": normalRate,
            }
        }).then((response) => {
            expect(response.status).to.be.eq(200)
        })
    })

    it('should not adds a review with script', () => {
        cy.request({
            method: 'POST',
            url: apiUrl + "/reviews", 
            failOnStatusCode: true, 
            headers: {
                "Authorization" : "Bearer " + Cypress.env('token') 
            },
            body: {
                "title": normalTitle,
                "comment": "<script> alert('Test') </script> ",
                "rating": normalRate,
            }
        }).then((response) => {
            expect(response.status).to.be.eq(500)
        })
    })
})

