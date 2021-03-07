describe('randomize a movie', () => {
  it('shows one movie', () => {
    cy.get('[data-test="component-movie-randomizer"]').click()
    cy.get('.app-results-movies h1').contains('A totally random movie....any good?')
    cy.get('.movie-item').should('have.length', 1)
  })
  it('shows a new movie each time', () => {
    cy.get('[data-test="component-movie-randomizer"]').click()
    cy.get('.movie-item').should('have.length', 1)
    cy.get('.movie-item__title').then(($title) => {
      const txt = $title.text()
      cy.get('[data-test="component-movie-randomizer"]').click()
      cy.get('.movie-item__title').should(($title2) => {
        expect($title2.text()).not.to.eq(txt)
      })
    })
    
  })
})