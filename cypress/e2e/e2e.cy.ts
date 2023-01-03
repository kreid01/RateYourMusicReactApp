import { waitFor } from "@testing-library/react";

export const test = null;

beforeEach("Launch shite", () => {
  cy.visit("http://localhost:19006");
});

describe("Search", () => {
  it("accepts search input to a release, and returns home", () => {
    const url = "http://192.168.0.120/graphql";
    cy.intercept("POST", url).as("getReleases");

    cy.wait("@getReleases");

    cy.get('input[placeholder="Search..."]')
      .should("exist")
      .click({ force: true })
      .type("red")
      .wait(500);

    cy.contains("24 May 1999").click({ force: true }).wait(500);

    cy.get('[aria-label="back-button"]').click();

    cy.get('input[placeholder="Search..."]').should("exist");
  });
});

describe("Post Review", () => {
  it("goes to clicked on release and lets the user review", () => {
    const url = "http://192.168.0.120/graphql";
    cy.intercept("POST", url).as("postReleaseCheck");

    cy.contains("Down Colorful Hill").click();

    cy.get('[aria-label="back-button"]').should("be.visible");

    cy.contains("Review")
      .should("exist")
      .scrollIntoView()
      .click({ force: true });

    cy.get('[aria-label="review-title"]')
      .type("title")
      .should("have.value", "title");
    cy.get('[aria-label="review-description"]')
      .type("description")
      .should("have.value", "description");

    cy.get('[aria-label="submit-review-button"]')
      .click()
      .wait("@postReleaseCheck");
  });
});

describe("Login", () => {
  it("allows user to move to login screen and login", () => {
    const url = "http://192.168.0.120/graphql";
    cy.intercept("POST", url).as("loginCheck");

    cy.contains("Account").click();

    cy.get('[aria-label="login-email"]')
      .type("kieranreid2014@icloud.com")
      .should("have.value", "kieranreid2014@icloud.com");

    cy.get('[aria-label="login-password"]')
      .type("kiki8kiki8")
      .should("have.value", "kiki8kiki8");

    cy.get('[aria-label="login-button"]').click();

    cy.wait("@loginCheck");
  });
});

describe("Register", () => {
  beforeEach("Go to register screen", () => {
    cy.contains("Account").click();

    cy.contains("Sign up").click();

    const url = "http://192.168.0.120/graphql";
    cy.intercept("POST", url).as("registerCheck");
  });
  it("allows users to go to the register screen and create a new account", () => {
    cy.get('[aria-label="register-username"]')
      .type("Doe")
      .should("have.value", "Doe");

    cy.get('[aria-label="register-email"]')
      .type("janedoe@email.com")
      .should("have.value", "janedoe@email.com");

    cy.get('[aria-label="register-password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('[aria-label="register-password-confirm"]')
      .type("password")
      .should("have.value", "password");

    cy.get('[aria-label="register-button"]').click().wait("@registerCheck");
  });

  it("shows users errors while registering and disabled the request to the server", () => {
    cy.get('[aria-label="register-username"]')
      .type("Doe")
      .should("have.value", "Doe");

    cy.get('[aria-label="register-email"]')
      .type("janedoe@email.com")
      .should("have.value", "janedoe@email.com");

    cy.get('[aria-label="register-password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('[aria-label="register-password-confirm"]')
      .type("wrong")
      .should("have.value", "wrong");

    cy.contains("Passwords do not match");

    cy.get('[aria-label="register-button"]').click();
  });
});
