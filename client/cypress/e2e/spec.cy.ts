/// <reference types="cypress" />

describe('web app', () => {
  it('outputs css for font subsets', () => {
    cy.visit('/')

    cy.request("/getMetadata")

    cy.get("input").last().focus().type("Inter{downArrow}{enter}", { delay: 200 })

    cy.get("input[value=latin-ext]").parent().click()

    cy.get("[data-checked=true]").contains("Latin")
    cy.get("button").contains("Generate").click()
    cy.get("h2").contains("Output")

    cy.get("button").contains("Download All")

    cy.get('a').contains('latin').should('have.attr', 'href')
    cy.get('a').contains('latin-ext').should('have.attr', 'href')

    cy.get("pre").contains("/* latin */")
    cy.get("pre").contains("/* latin-ext */")
  })

  it('outputs italic fonts', () => {
    cy.visit('/')

    cy.request("/getMetadata")

    cy.get("input").last().focus().type("Inter Tight{downArrow}{enter}", { delay: 200 })

    cy.get("input[value=latin-ext]").parent().click()

    cy.get("label").contains("Italic").parent().click()

    cy.get("[data-checked=true]").contains("Latin")
    cy.get("button").contains("Generate").click()
    cy.get("h2").contains("Output")

    cy.get("button").contains("Download All")

    cy.get('a').contains('latin').should('have.attr', 'href')
    cy.get('a').contains('latin-ext').should('have.attr', 'href')

    cy.get("pre").should("contain.text", "/* latin */").and('contain.text', "normal")
    cy.get("pre").should("contain.text", "/* latin */").and('contain.text', "italic")
    cy.get("pre").should("contain.text", "/* latin-ext */").and('contain.text', "normal")
    cy.get("pre").should("contain.text", "/* latin-ext */").and('contain.text', "italic")
  })

  it("supports advanced settings", () => {
    cy.visit("/")

    cy.request("/getMetadata")

    cy.get("input").last().focus().type("Roboto F{downArrow}{enter}", { delay: 200 })

    cy.get('[type="checkbox"][id="cy-all-checkbox"]').check()
  })
})