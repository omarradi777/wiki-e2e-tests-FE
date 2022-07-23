import SearchPage from '../../pages/searchPage'

const searchPage = new SearchPage()

describe('Wikipedia Test Serach Scenarios', () => {
  beforeEach(() => {
    searchPage.visit()
  })
  it('Search for an article (Apollo 11)', () => {
    searchPage.searchForArticle('Apollo 11')
  })

  it('Search for an invalid article ', () => {
    searchPage.searchForInvalidArticle('ASDADFASDASDAS')
  })
})
