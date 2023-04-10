/// <reference types="cypress" />

import { listResponse } from "~/tests/_data";

describe("Navigation mobile", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/list", listResponse).as("listCurrencies");
    cy.visit("/");
    cy.get("[data-testid='nav-logo-link']").as("logoLink");
    cy.get("[data-testid='nav-burger-menu-button']").as("burgerMenuButton");
    cy.get("[data-testid='nav-home-link']").as("homeLink");
    cy.get("[data-testid='nav-favorites-link']").as("favoritesLink");
  });

  it("should work on desktop", () => {
    cy.viewport("macbook-16");
    cy.get("@logoLink");
    cy.get("@homeLink");
    cy.get("@favoritesLink");
  });

  it("should work on mobile", async () => {
    cy.viewport("iphone-x");
    cy.wait("@listCurrencies");
    cy.get("@logoLink");
    cy.get("@homeLink").should("not.be.visible");
    cy.get("@favoritesLink").should("not.be.visible");
    cy.get("@burgerMenuButton").click();
    cy.get("@homeLink").should("be.visible");
    cy.get("@favoritesLink").should("be.visible");
    cy.get("@burgerMenuButton").click();
    cy.get("@homeLink").should("not.be.visible");
    cy.get("@favoritesLink").should("not.be.visible");
  });
});
