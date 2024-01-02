const apiUrl = Cypress.env("apiUrl")
Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args)
  })

  Cypress.Commands.add('Connect', () => {
    const username = Cypress.env("username")
    const password = Cypress.env("password")
    cy.visit('/login');
    cy.getBySel('login-input-username').type(username);
    cy.getBySel('login-input-password').type(password);
    cy.getBySel('login-submit').click();
  });



  Cypress.Commands.add('getToken', () => {
    return cy.request({
      method: 'POST',
      url: apiUrl + '/login',
      body: {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
      },
    }).then((response) => {
      return response.body.token;
    });
  });