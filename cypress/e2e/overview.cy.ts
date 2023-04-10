/// <reference types="cypress" />

import { listResponse } from "~/tests/_data";
import { formatCurrencyCompact } from "~/helpers/utils";

describe("Overview page", () => {
  it("should show overview", () => {
    cy.visit(`/currency/${listResponse.data[0].symbol}`);

    const currency = listResponse.data[0];
    cy.intercept("GET", "api/list", listResponse);
    cy.get("[data-testid='logo']");
    cy.get("[data-testid='name']");
    cy.get("[data-testid='toggle-favorite-button']");
    cy.get("[data-testid='toggle-favorite-img']");
    cy.get("[data-testid='current-price']");
    cy.get("[data-testid='market-cap']").should(
      "contain.text",
      formatCurrencyCompact(currency.quote.USD.market_cap)
    );
    cy.get("[data-testid='volume-24h']").should(
      "contain.text",
      formatCurrencyCompact(currency.quote.USD.volume_24h)
    );
    cy.get("[data-testid='current-supply']").should(
      "contain.text",
      `${formatCurrencyCompact(
        currency.circulating_supply
      )} ${currency.symbol.toUpperCase()}`
    );

    cy.get("[data-testid='tag']").should("have.length", currency.tags.length);
  });
});

describe("Overview page loading", () => {
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

    cy.visit(`/currency/${listResponse.data[0].symbol}`);

    cy.get("[data-testid='currency-overview-loader']").then(() => {
      sendResponse();
      cy.get("[data-testid='currency-overview-loader']").should("not.exist");
    });
  });
});

describe("Overview page loading error", () => {
  it("should show data not found", () => {
    cy.intercept("GET", "api/list", {
      statusCode: 404,
      body: "404 Not Found!",
      headers: {
        "x-not-found": "true",
      },
    });
    cy.visit(`/currency/${listResponse.data[0].symbol}`);
    cy.get("[data-testid='loading-error-image']");
    cy.get("[data-testid='loading-error-title']").should(
      "contain.text",
      "Loading Error Occurred"
    );
    cy.intercept("GET", "api/list", listResponse);
    cy.get("[data-testid='loading-error-cta']").click();

    const currency = listResponse.data[0];
    cy.intercept("GET", "api/list", listResponse);
    cy.get("[data-testid='logo']");
    cy.get("[data-testid='name']");
    cy.get("[data-testid='toggle-favorite-button']");
    cy.get("[data-testid='toggle-favorite-img']");
    cy.get("[data-testid='current-price']");
    cy.get("[data-testid='market-cap']").should(
      "contain.text",
      formatCurrencyCompact(currency.quote.USD.market_cap)
    );
    cy.get("[data-testid='volume-24h']").should(
      "contain.text",
      formatCurrencyCompact(currency.quote.USD.volume_24h)
    );
    cy.get("[data-testid='current-supply']").should(
      "contain.text",
      `${formatCurrencyCompact(
        currency.circulating_supply
      )} ${currency.symbol.toUpperCase()}`
    );

    cy.get("[data-testid='tag']").should("have.length", currency.tags.length);
  });
});
