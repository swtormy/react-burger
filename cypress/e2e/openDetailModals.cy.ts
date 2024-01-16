describe('Opening and closing the ingredient modal window', () => {
  it('Site visit', () => {
    cy.visit('/');

    const draggableIngredientCard = '[data-cy=ingridient-card-643d69a5c3f7b9001cfa0943]';
    cy.get(draggableIngredientCard).should('exist').click();


    const calories = '[data-cy=calories]';
    const closeModal = '[data-cy=close-modal-window]';
    
    cy.get(calories).should('exist').then($calories => {
      if ($calories.text().trim() !== '') {
        cy.get(closeModal).click();
      }
    });
  })

  
})