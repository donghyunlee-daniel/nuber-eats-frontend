import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  makeVar,
  createHttpLink,
  split,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import {GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from "graphql-ws";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);


const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://localhost:4000/graphql`,
    connectionParams: {
      "x-jwt": authTokenVar() || "",
    }
  })
)

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});


const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return(
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)


export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar;
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
