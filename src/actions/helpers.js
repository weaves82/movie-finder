export const certificateGrouping = (certArray) => {
  // take first term and last term in array
  // gte of first one and less than second one
  certArray.sort((a, b) => a.order - b.order)
  //certArray.sort((a,b) => a.order > b.order ? 1 : -1)
  const firstItem = `&certification.gte=${certArray[0].id}`
  const lastItem = `&certification.lte=${certArray[(certArray.length - 1)].id}`
  return firstItem + lastItem
}

export const getFilterQuery = (filterObj) => {
  let certQuery = '',
    yearQuery = '',
    genresQuery = '';
  const {
    certificates,
    year,
    genres
  } = filterObj
  if (certificates && certificates.length > 0) {
    certQuery = certificates.length > 1 ?
      certificateGrouping(certificates) :
      `&certification=${certificates[0].id}`
    certQuery = `&certification_country=CA${certQuery}`
  }

  if (year && year.length > 0) {
    yearQuery = `&primary_release_year=${year}`
  }
  if (genres && genres.length > 0) {
    genresQuery = genres.map((item) => item.id)
    genresQuery = `&with_genres=${genresQuery.join(',')}`
  }

  return certQuery + yearQuery + genresQuery
}