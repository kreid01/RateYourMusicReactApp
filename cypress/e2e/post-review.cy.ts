export const test = null;

beforeEach("Launch shite", () => {
  cy.visit("http://localhost:19006");
});

describe("search and view single release", () => {
  it("accepts search input to a release, and returns home", () => {
    cy.get('input[placeholder="Search..."]')
      .should("exist")
      .click({ force: true })
      .type("red")
      .wait(500);

    cy.contains("24 May 1999").click().wait(500);

    cy.get('[aria-label="back-button"]').click();

    cy.get('input[placeholder="Search..."]').should("exist");
  });
});

describe("go to a release a post a review", () => {
  it("goes to clicked on release", () => {
    const url = "http://localhost/80/graphql";
    cy.intercept("POST", url, (req) => {
      if (req.body.operationName === "postReviewMutation") {
        req.alias = "PostReview";
        req.continue;
      }
    });

    cy.contains("Down Colorful Hill").click();

    cy.get('[aria-label="back-button"]').should("be.visible");

    cy.contains("Review").should("exist").click();

    cy.get('[aria-label="review-title"]')
      .type("title")
      .should("have.value", "title");
    cy.get('[aria-label="review-description"]')
      .type("description")
      .should("have.value", "description");

    cy.wait("@PostReview");
    cy.get('[aria-label="submit-review-button"]').click();
  });
});
