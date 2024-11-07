import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoryComp } from "../category";
import { render } from "@testing-library/react";

describe("<Category />", () => {
  it("renders OK with props", () => {
    const categoryProps = {
      categoryName: "test",
      coverImg: "x",
      slug: "slugTest",
    };
    const { getByText, container } = render(
      <Router>
        <CategoryComp {...categoryProps} />
      </Router>
    );
    getByText(categoryProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/category/${categoryProps.slug}`
    );
  });
});
