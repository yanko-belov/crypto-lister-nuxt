/// <reference types="cypress" />

import { listResponse } from "~/tests/_data";

describe("Add, remove and count favorites", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", "api/list", listResponse);
    cy.get("[data-testid='toggle-favorite-button']").as("favoriteToggleButton");
    cy.get("[data-testid='currency-card']").as("currencyCard");
    cy.get("[data-testid='favorites-counter']").as("favoritesCounter");
  });

  it("should add, remove and count favorites from list page", () => {
    cy.get("@favoritesCounter").should("have.text", "0");

    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-inactive.svg']");
    cy.get("@favoriteToggleButton").first().click();
    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-active.svg']");
    cy.get("@favoritesCounter").should("have.text", "1");

    cy.get("@currencyCard")
      .eq(2)
      .get("img[src='/img/icons/favorite-inactive.svg']");
    cy.get("@favoriteToggleButton").eq(2).click();
    cy.get("@currencyCard")
      .eq(2)
      .get("img[src='/img/icons/favorite-active.svg']");
    cy.get("@favoritesCounter").should("have.text", "2");

    cy.get("@favoriteToggleButton").first().click();
    cy.get("@favoritesCounter").should("have.text", "1");

    cy.get("@favoriteToggleButton").eq(2).click();
    cy.get("@favoritesCounter").should("have.text", "0");
  });

  it("should add, remove and count favorites from overview page", () => {
    cy.get("@favoritesCounter").should("have.text", "0");

    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-inactive.svg']");
    cy.get("@favoriteToggleButton").first().click();
    cy.get("@favoritesCounter").should("have.text", "1");
    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-active.svg']");
    cy.get("@currencyCard").first().click();

    cy.location("pathname").should(
      "eq",
      `/currency/${listResponse.data[0].symbol}`
    );
    cy.get("@favoritesCounter").should("have.text", "1");
    cy.get("@favoriteToggleButton")
      .should("contain.text", "Remove from Favorites")
      .click();

    cy.get("@favoritesCounter").should("have.text", "0");
    cy.get("@favoriteToggleButton")
      .should("contain.text", "Add to Favorites")
      .click();

    cy.get("@favoriteToggleButton").should(
      "contain.text",
      "Remove from Favorites"
    );
    cy.get("@favoritesCounter").should("have.text", "1");
    cy.get("[data-testid='nav-home-link']").click();
    cy.location("pathname").should("eq", "/");
    cy.get("@favoritesCounter").should("have.text", "1");
    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-active.svg']");
    cy.get("@favoriteToggleButton").first().click();
    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-inactive.svg']");
  });

  it("should add, remove and count favorites from favorites page", () => {
    cy.get("@favoritesCounter").should("have.text", "0");

    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-inactive.svg']");
    cy.get("@favoriteToggleButton").first().click();
    cy.get("@favoritesCounter").should("have.text", "1");
    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-active.svg']");

    cy.get("[data-testid='nav-favorites-link']").click();

    cy.get("@favoritesCounter").first().should("have.text", "1");
    cy.get("@favoritesCounter").eq(1).should("have.text", "1");

    cy.get("@favoriteToggleButton").first().click();

    cy.get("@favoritesCounter").first().should("have.text", "0");
    cy.get("@favoritesCounter").eq(1).should("have.text", "0");
    cy.get("[data-testid='nav-logo-link']").click();

    cy.location("pathname").should("eq", "/");
    cy.get("@favoritesCounter").should("have.text", "0");
    cy.get("@currencyCard")
      .first()
      .get("img[src='/img/icons/favorite-inactive.svg']");
  });
});
