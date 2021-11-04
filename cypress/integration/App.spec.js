describe ('Test App', () => {
    it ('launches', () => {
      cy.visit ('/');
    });

    it ('Welcome message contains date', () => {
      cy.visit ('/');
      cy.get('[data-cy=canvas-layout]').should('contain', (new Date()).getDate());
    });
});