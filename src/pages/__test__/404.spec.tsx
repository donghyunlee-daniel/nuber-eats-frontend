import React from "react";
import { NotFound } from "../user/404";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitFor } from "../../test-utils";

describe("<NotFound />", () => {
  it("renders OK,", async () => {
    render(<NotFound />);
    await waitFor(() => {
      expect(document.title).toBe("Not Found | Nuber Eats");
    });
  });
});
