const {
  replaceSpaceWithUnderscore,
} = require('../../utilities/helperFunctions')

const elements = require('./elements')
const data = require('./data')

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

  searchForArticle(articleName = data.VALID_ARTICLE) {
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

  searchForInvalidArticle(articleName = data.INVALID_ARTICLE) {
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
