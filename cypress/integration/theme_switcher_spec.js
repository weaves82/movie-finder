
describe('ThemeSwitcher', () => {
  it('Switched themes', () => {
      cy.get("#app").should("have.class", "light-theme")
      cy.get(".can-toggle__switch").click()
      cy.get("#app").should("have.class", "dark-theme")
      cy.get(".can-toggle__switch").click()
      cy.get("#app").should("have.class", "light-theme")
  })
})