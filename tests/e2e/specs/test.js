// https://docs.cypress.io/api/introduction/api.html

describe('Validaciones Home', () => {
  it('Validar Nombre empresa', () => {
    cy.visit('/')
    cy.contains('p', 'AUTODESK')
  })

  it('Validar input user', () => {
    cy.visit('/')
    cy.get('#inputUser').type("admin@gmail.com")
  })

  it('Validar input password', () => {
    cy.visit('/')
    cy.get('#inputPassword').type("123456")
  })

  it('Validar Pagina de registro', () => {
    cy.visit('/register')
  })

  it('Validar inputs de registro', () => {
    cy.visit('/register')
    cy.get('#inputName').type("Alexis")
    cy.get('#inputLastName').type("Sanchez")
    cy.get('#inputEmail').type("alexis@gmail.com")
    cy.get('#inputRut').type("12345678-k")
    cy.get('#inputPosition').type("Jugador")
    cy.get('#inputPhone').type("987456321")
    cy.get('#inputCompany').type("Inter de Milan")
    cy.get('#inputCity1').type("Santiago",{force: true})
    cy.get('#inputPassword').type("123456",{force: true})
  })
  
  it('Validar Pagina no encontrada 404', () => {
    cy.visit('/asdadada')
  })
})
