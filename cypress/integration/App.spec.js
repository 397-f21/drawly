describe ('Test App', () => {
    it ('launches', () => {
      cy.visit ('/');
    });

    it ('Welcome message contains date', () => {
      cy.visit ('/');
      cy.get('[data-cy=canvas-layout]').should('contain', (new Date()).getDate());
    });

    it ('Clicking draw tab shows calendar', () => {
      cy.visit ('/');
      cy.get('[data-cy=draw-tab]').click();
      cy.get('[data-cy=cal]').should('be.visible');
    });
});