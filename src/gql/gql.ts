/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n": types.RestaurantPartsFragmentDoc,
    "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n": types.CategoryPartsFragmentDoc,
    "\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n": types.MeDocument,
    "\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n": types.CategoryDocument,
    "\n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n": types.RestaurantDocument,
    "\n  query restaurantsPage($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n  \n": types.RestaurantsPageDocument,
    "\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n": types.SearchRestaurantDocument,
    "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n": types.VerifyEmailDocument,
    "\n          fragment VerifiedUser on User {\n            verified\n          }\n        ": types.VerifiedUserFragmentDoc,
    "\n  mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditProfileDocument,
    "\n          fragment EditedUser on User {\n            verified\n            email\n          }": types.EditedUserFragmentDoc,
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"): (typeof documents)["\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n"): (typeof documents)["\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query restaurantsPage($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query restaurantsPage($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          fragment VerifiedUser on User {\n            verified\n          }\n        "): (typeof documents)["\n          fragment VerifiedUser on User {\n            verified\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          fragment EditedUser on User {\n            verified\n            email\n          }"): (typeof documents)["\n          fragment EditedUser on User {\n            verified\n            email\n          }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;