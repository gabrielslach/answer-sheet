import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, from } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import store from '../store';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:5001/answersheet-ez/us-central1/app',
});

// Cache implementation
const cache = new InMemoryCache();

// Adding the authorization to the headers
const authMiddleware = new ApolloLink((operation, forward) => {
  if (store.getters.getAuthToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${store.getters.getAuthToken}`,
      }
    }));
  }

  return forward(operation);
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: from([
    authMiddleware,
    httpLink
  ]),
  cache,
});

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })

export default apolloProvider;