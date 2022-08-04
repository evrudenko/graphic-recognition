/// <reference types="cypress" />

describe('recognition tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('image 10', {defaultCommandTimeout: 6000}, () => {
    cy.get('[id="img10"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then((imageUrl) => {
      return cy.task('recognizePieChartWithOneLine', imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'firstLine': '30,22' })
    })
  })

  it('image 11', {defaultCommandTimeout: 6000}, () => {
    cy.get('[id="img11"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then((imageUrl) => {
      return cy.task('recognizePieChartWithTwoLines', imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'firstLine': '30,22', 'secondLine': '78,4%' })
    })
  })

  it('image 12', {defaultCommandTimeout: 6000}, () => {
    cy.get('[id="img12"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then((imageUrl) => {
      return cy.task('recognizePieChartWithTwoLines', imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'firstLine': '30,22', 'secondLine': '30,7%' })
    })
  })

  it('image 13', {defaultCommandTimeout: 6000}, () => {
    cy.get('[id="img13"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then((imageUrl) => {
      return cy.task('recognizeChart3', imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'values': [ '88,9%', '30,22', '26,86'] })
    })
  })

  it('image 14', {defaultCommandTimeout: 6000}, () => {
    cy.get('[id="img14"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then((imageUrl) => {
      return cy.task('recognizeChart4', imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'values': [ '33', '23', '23', '21', '5', '5', '4', '3' ] })
    })
  })
})