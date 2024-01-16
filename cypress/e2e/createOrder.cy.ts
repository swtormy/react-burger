Cypress.Commands.add('dragAndDrop', (subject, target) => {
  const draggable = cy.get(subject);
  const droppable = cy.get(target);

  draggable.trigger('mousedown', { which: 1 })
    .trigger('dragstart')
    .then(() => {
      droppable.trigger('dragenter')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend')
        .trigger('mouseup', { force: true });
    });
});

describe('Drag and Drop IngredientCard', () => {
  it('drag and drop items, create an order, perform authorization, close the modal window after receiving the order number', () => {
    cy.visit('/');

    const draggableIngredientCardBun = '[data-cy=ingridient-card-643d69a5c3f7b9001cfa093c]';
    const draggableIngredientCardOne = '[data-cy=ingridient-card-643d69a5c3f7b9001cfa0943]';
    const draggableIngredientCardTwo = '[data-cy=ingridient-card-643d69a5c3f7b9001cfa0949]';
    const dropTarget = '[data-cy=drop-target]';

    cy.dragAndDrop(draggableIngredientCardBun, dropTarget);
    cy.dragAndDrop(draggableIngredientCardOne, dropTarget);
    cy.dragAndDrop(draggableIngredientCardTwo, dropTarget);

    const makeOrderButton = '[data-cy=make-an-order]';
    cy.get(makeOrderButton).click();

    const loginInput = '[data-cy=login-input]';
    const passwordInput = '[data-cy=password-input]';
    const closeModal = '[data-cy=close-modal-window]';
    const orderNumber = '[data-cy=order-number]'
    cy.document().then(doc => {
      const orderNumberElement = doc.querySelector(orderNumber);
      if (orderNumberElement && orderNumberElement.textContent.trim() !== '') {
        cy.get(orderNumber, { timeout: 30000 }).should('exist').then($orderNumber => {
          if ($orderNumber.text().trim() !== '') {
            cy.get(closeModal).click();
          }
        });
      } else {
        cy.visit('/login');
        cy.get(loginInput).type(Cypress.env('REACT_APP_TEST_USER'));
        cy.get(passwordInput).type(Cypress.env('REACT_APP_TEST_PASSWORD'));

        const login = '[data-cy=login]';
        cy.get(login).click();

        cy.dragAndDrop(draggableIngredientCardBun, dropTarget);
        cy.dragAndDrop(draggableIngredientCardOne, dropTarget);
        cy.dragAndDrop(draggableIngredientCardTwo, dropTarget);

        cy.get(makeOrderButton).click();

        cy.document().then(doc => {
          cy.get(orderNumber, { timeout: 30000 }).should('exist').then($orderNumber => {
            if ($orderNumber.text().trim() !== '') {
              cy.get(closeModal).click();
            }
          });
        })
      }
    });
  });
});
