describe("Log In", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  });
  it("can see email / passwrod validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("bad@eamil");
    cy.findByRole("alert").should("have.text", "Please enter a valid email");
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "Email is required");
    cy.findByPlaceholderText(/email/i).type("daniel@nomadcoders.com");
    cy.findByPlaceholderText(/password/i).type("a").clear();
    cy.findByRole("alert").should("have.text", "Password is required");
  });
  it("can fill out the form and log in", () => {
    cy.login()
  });
  
});
