/// <reference types="cypress" />

describe('CRA', () => {
  it('shows learn link', function () {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy="new-airplane-button"]').should('be.visible')
    cy.get('tr').should('be.visible')
    cy.get('tr').last().get('td').last().click();
    cy.get('[data-cy="total-seats"]').should('have.text', '40')
    cy.get('[data-cy="seat"]').should('have.length', 40)
    cy.get('input').should('have.value', '0')
    cy.get('input').type('20').should('have.value', '020').then(() => {
      cy.get('[data-cy-allotted="true"]').should('have.length', 20)
      cy.get('[data-cy-allotted-passenger="1"]').should('have.attr', 'type', 'A')
      cy.get('[data-cy-allotted-passenger="2"]').should('have.attr', 'type', 'A')
      cy.get('[data-cy-allotted-passenger="9"]').should('have.attr', 'type', 'W')
      cy.get('[data-cy-allotted-passenger="19"]').should('have.attr', 'type', 'M')
    })
  })
})
