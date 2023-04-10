/// <reference types="cypress" />

import { listResponse } from "~/tests/_data";

describe("List page listing and filtering", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", "api/list", listResponse);
    cy.get("[data-testid='filter-input']").as("filterInput");
    cy.get("[data-testid='currency-card']").as("currencyCard");
    cy.get("[data-testid='favorites-counter']").as("favoritesCounter");
  });

  it("should show filter", () => {
    cy.get("@filterInput");
  });

  it("should show card with controls", () => {
    cy.get("@filterInput").should("not.be.disabled");
    cy.get("[data-testid='card-container']");
    cy.get("@currencyCard")
      .should("have.length", listResponse.data.length)
      .get("[data-testid='toggle-favorite-button']")
      .should("have.length", listResponse.data.length)
      .get("img[src='/img/icons/favorite-inactive.svg']")
      .should("have.length", listResponse.data.length)
      .get("[data-testid='currency-details-button']")
      .should("have.length", listResponse.data.length);

    cy.get("@favoritesCounter").should("have.text", "0");
  });

  it("should show counter", () => {
    cy.get("@favoritesCounter").should("have.text", "0");
  });

  it("should filter properly", () => {
    cy.get("@currencyCard").should("have.length", listResponse.data.length);
    cy.get("@filterInput").type(listResponse.data[0].name);
    cy.get("@currencyCard").should("have.length", 1);

    cy.get("@filterInput").clear();
    cy.get("@currencyCard").should("have.length", listResponse.data.length);

    cy.get("@filterInput").clear().type(listResponse.data[0].symbol);
    cy.get("@currencyCard").should("have.length", 1);

    cy.get("@filterInput").clear();
    cy.get("@currencyCard").should("have.length", listResponse.data.length);
  });

  it("should have cta when there are no results from filter", () => {
    const filter = "some totally random string";
    cy.get("@currencyCard").should("have.length", listResponse.data.length);
    cy.get("@filterInput").type(filter);
    cy.get("@currencyCard").should("not.exist");

    cy.get("@filterInput");
    cy.get("[data-testid='missing-data-title']")
      .should("contain.text", `No Currencies Found with filter "${filter}"`)
      .click();
    cy.get("[data-testid='clear-filter']").click();

    cy.get("@filterInput").should("have.value", "");
    cy.get("@currencyCard").should("have.length", listResponse.data.length);
  });
});

describe("List page loading", () => {
  it("should show loading skeleton", () => {
    let sendResponse: (value?: unknown) => void;
    const trigger = new Promise((resolve) => {
      sendResponse = resolve;
    });

    cy.intercept("GET", "api/list", (request) =>
      trigger.then(() => {
        request.reply(listResponse);
      })
    );

    cy.visit("/");

    cy.get("[data-testid='filter-input']");
    cy.get("[data-testid='currency-list-container-loader']");
    cy.get("[data-testid='currency-loader-card']")
      .should("have.length", 15)
      .then(() => {
        sendResponse();
        cy.get("[data-testid='currency-list-container-loader']").should(
          "not.exist"
        );
        cy.get("[data-testid='currency-loader-card']").should("not.exist");
      });
  });
});

describe("List page no data", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", "api/list", {
      data: [],
      timestamp: listResponse.timestamp,
    });
  });

  it("should show data not found", () => {
    cy.get("[data-testid='missing-data']");
    cy.get("[data-testid='missing-data-title']").should(
      "have.text",
      "No Currencies Found"
    );
    cy.get("[data-testid='missing-data-image']");
  });
});

describe("List page loading error", () => {
  it("should show data not found", () => {
    cy.intercept("GET", "api/list", {
      statusCode: 404,
      body: "404 Not Found!",
      headers: {
        "x-not-found": "true",
      },
    });
    cy.visit("/");
    cy.get("[data-testid='loading-error-image']");
    cy.get("[data-testid='loading-error-title']").should(
      "contain.text",
      "Loading Error Occurred"
    );
    cy.intercept("GET", "api/list", listResponse);
    cy.get("[data-testid='loading-error-cta']").click();

    cy.get("[data-testid='filter-input']");
    cy.get("[data-testid='card-container']");
    cy.get("[data-testid='currency-card']").should(
      "have.length",
      listResponse.data.length
    );
  });
});
