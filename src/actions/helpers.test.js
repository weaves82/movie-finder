import * as helpers from './helpers'

test("certificateGrouping function", () => {
  const certArray = [{
    id: '18A',
    order: 4
  }, {
    id: 'PG',
    order: 2
  }]
  const getResults = helpers.certificateGrouping(certArray)
  expect(getResults).toEqual("&certification.gte=PG&certification.lte=18A")
})

describe("getFilterQuery function", () => {
  test("with multiple certifications", () => {
    const filterObj = {
      certificates: [{
        id: 'PG',
        order: 2
      }, {
        id: '18A',
        order: 3
      }],
      genres: [{
        id: '35',
        name: 'genre1'
      }, {
        id: '16',
        name: 'genre2'
      }],
      year: "1990"
    }
    const getFilterQuery = helpers.getFilterQuery(filterObj);
    expect(getFilterQuery).toEqual("&certification_country=CA&certification.gte=PG&certification.lte=18A&primary_release_year=1990&with_genres=35,16")
  })
  test("single certification", () => {
    const filterObj = {
      certificates: [{
        id: 'PG',
        order: 2
      }],
      genres: [{
        id: '35',
        name: 'genre1'
      }],
      year: "1998"
    }
    const getFilterQuery = helpers.getFilterQuery(filterObj);
    expect(getFilterQuery).toEqual("&certification_country=CA&certification=PG&primary_release_year=1998&with_genres=35")

  })

})