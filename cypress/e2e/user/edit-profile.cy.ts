describe("Edit Profile", () => {
  beforeEach(() => {
    cy.login();
    cy.get('a[href="/edit-profile"]').click();
  });
  it("can go to /edit-profile using the header", () => {
    cy.assertTitle("Edit Profile");
  });
  it("can change email", () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
        if(req.body.operationName  === "editProfile"){
            req.body.variables.input.email = "theReal@mail.com"
        }
    })
    cy.findByPlaceholderText(/email/i).clear().type("theNewReal@mail.com");
    cy.findByRole("button").click();
  });
});
