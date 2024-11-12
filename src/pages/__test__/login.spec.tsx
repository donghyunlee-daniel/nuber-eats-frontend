import React from "react";
import { LOGIN_MUTATION, Login } from "../user/login";
import { ApolloProvider } from "@apollo/client";
import { MockApolloClient, createMockClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";
import { RenderResult, act, render, waitFor } from "../../test-utils";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Login />
        </ApolloProvider>
      );
    });
  });
  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });
  it("displays email validation errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await act(async () => {
      userEvent.type(email, "this@wont");
    });

    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);
    await act(async () => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required/i);
  });
  it("displays password required errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("button");
    await act(async () => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submitBtn);
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });
  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "1234",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: null,
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    await act(async () => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "XXX");
  });
  it("displays mutation error", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "1234",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: false,
          token: null,
          error: "Mutation-Error",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    await act(async () => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Mutation-Error/i);
  });
});
