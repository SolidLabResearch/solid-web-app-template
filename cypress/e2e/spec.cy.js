describe('Web app', () => {
  it('successfully loads', () => {
    cy.visit('/');
  })

  it('execute query on public data', () => {
    cy.visit('/');
    cy.contains('Show book wish list').click();
    cy.contains('Too Late'); // Check if it has one of the correct books.
  });

  it('log in and execute query on private data', () => {
    cy.visit('/');
    cy.contains('Log in').click();

    // Log in
    cy.get('input#email').type('hello@example.com');
    cy.get('input#password').type('abc123');
    cy.contains('button', 'Log in').click();
    cy.contains('button', 'Authorize').click();

    // Query private data
    cy.contains('Show favourite books').click();
    cy.contains('It Ends With Us'); // Check if it has one of the correct books.
  });
})
