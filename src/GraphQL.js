import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL = process.env.REACT_APP_API_URL;

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

const getCategories = () => {
  return client.query({
    query: gql`
      query {
        categories {
          name
        }
      }
    `,
  });
};

const getProducts = (category = null, galleryLimit = null) => {
  return client.query({
    query: gql`
      query GetProducts($category: String, $galleryLimit: Int) {
        products(category: $category, galleryLimit: $galleryLimit) {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            items {
              id
              value
              displayValue
            }
            name
            type
          }
          prices {
            amount
            currency {
              label
              symbol
            }
          }
          brand
        }
      }
    `,
    variables: {
      category,
      galleryLimit,
    },
    fetchPolicy: "no-cache",
  });
};

const getProductById = (id, galleryLimit = null) => {
  return client.query({
    query: gql`
      query GetProductById($id: ID!, $galleryLimit: Int) {
        product(id: $id, galleryLimit: $galleryLimit) {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            items {
              id
              value
              displayValue
            }
            name
            type
          }
          prices {
            amount
            currency {
              label
              symbol
            }
          }
          brand
        }
      }
    `,
    variables: {
      id,
      galleryLimit,
    },
  });
};

const addOrder = (order) => {
  return client.mutate({
    mutation: gql`
      mutation AddOrder(
        $id: String!
        $totalQuantity: Int!
        $totalAmount: Float!
        $currencyLabel: String!
        $products: [ProductInput]!
      ) {
        addOrder(
          order: {
            id: $id
            totalQuantity: $totalQuantity
            totalAmount: $totalAmount
            currencyLabel: $currencyLabel
            products: $products
          }
        )
      }
    `,
    variables: order,
  });
};

export { getProducts, getProductById, getCategories, addOrder };
