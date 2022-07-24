/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000')
  })

  it('image 10', () => {
    cy.get('[id="img10"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then(async (imageUrl) => {
      const GraphicRecognizer = require('../../graphic-recognition')
      const graphicRecognizer = new GraphicRecognizer()
      return await graphicRecognizer.recognizePieChartWithOneLine(imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'firstLine': '30,22' })
    })
  })

  it('image 11', () => {
    cy.get('[id="img11"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then(async (imageUrl) => {
      const GraphicRecognizer = require('../../graphic-recognition')
      const graphicRecognizer = new GraphicRecognizer()
      return await graphicRecognizer.recognizePieChartWithTwoLines(imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'firstLine': '30,22', 'secondLine': '78,4%' })
    })
  })

  it('image 12', () => {
    cy.get('[id="img12"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then(async (imageUrl) => {
      const GraphicRecognizer = require('../../graphic-recognition')
      const graphicRecognizer = new GraphicRecognizer()
      return await graphicRecognizer.recognizePieChartWithTwoLines(imageUrl)
    })
    .then((pred) => {
      expect(pred).to.deep.equal({ 'firstLine': '30,22', 'secondLine': '30,7%' })
    })
  })

  it('image 13', () => {
    cy.get('[id="img13"]')
    .should('be.visible')
    .should('have.attr', 'src')
    .then((src) => {
      return'http://localhost:3000/' + src
    })
    .then(async (imageUrl) => {
      const GraphicRecognizer = require('../../graphic-recognition')
      const graphicRecognizer = new GraphicRecognizer()
      return await graphicRecognizer.recognizePieChartWithTwoLines(imageUrl)
    })
    .then((pred) => {
      expect(pred).equal('')
    })
  })
})