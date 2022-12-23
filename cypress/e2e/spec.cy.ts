export const ham = "";

describe("search and view single release", () => {
  it("passes", () => {
    cy.visit("http://localhost:19006");
    cy.get('input[placeholder="Search..."]').should("exist");
    cy.get('input[placeholder="Search..."]').type("red");
  });
});
