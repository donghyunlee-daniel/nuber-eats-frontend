import { render } from "@testing-library/react";
import React from "react";
import { RestaurantComp } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("renders OK with props", () => {
    const restaurantProps = {
      id: "1",
      name: "nameTest",
      categoryName: "catTest",
      coverImg: "x",
    };
    const { getByText, container } = render(
      <Router>
        <RestaurantComp {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurants/${restaurantProps.id}`
    );
  });
});
