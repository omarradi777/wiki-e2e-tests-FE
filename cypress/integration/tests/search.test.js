import SearchPage from '../pages/search.page'

const searchPage = new SearchPage()

describe('Wikipedia Test Serach Scenarios', () => {
  beforeEach(() => {
    searchPage.visit()
  })
  it('Search for an article (Apollo 11)', () => {
    searchPage.searchForArticle()
  })

  it('Search for an invalid article', () => {
    searchPage.searchForInvalidArticle()
  })
})
