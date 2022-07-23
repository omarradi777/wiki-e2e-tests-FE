const {
  replaceSpaceWithUnderscore,
} = require('../../utilities/helperFunctions')

const elements = require('./elements')

export default class SearchPage {
  visit() {
    cy.visit('/')
  }

  _interceptArticleSearchResponse(articleName) {
    cy.intercept({
      method: 'GET',
      url: `${Cypress.config('apiBaseUrl')}*`,
      query: {
        gpssearch: articleName,
        pilimit: '6',
      },
    }).as('searchCriteria')
  }

  searchForArticle(articleName) {
    let expectedURL = `https://en.wikipedia.org/wiki/${replaceSpaceWithUnderscore(
      articleName
    )}`
    this._interceptArticleSearchResponse(articleName)
    cy.get(elements.SERACH_FIELD).type(articleName)
    cy.wait('@searchCriteria')
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.get(elements.DROPDOWN_SUGGESTIONS)
          .children()
          .eq(0)
          .should('contain', articleName)
          .should('have.attr', 'href', expectedURL)
          .click()
        cy.url().should('include', expectedURL)
      })
  }

  searchForInvalidArticle(articleName) {
    this._interceptArticleSearchResponse(articleName)
    cy.get(elements.SERACH_FIELD).type(articleName)
    cy.wait('@searchCriteria')
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.get(elements.DROPDOWN_SUGGESTIONS).children().should('not.exist')
      })
  }
}
