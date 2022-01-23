import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, from } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import store from '../store';

let WEB_SERVER_URL;
if (
  window.location.protocol === "https:" //||
  // window.location.hostname === "bingo.gabrielslach.me"
) {
  WEB_SERVER_URL = "https://us-central1-answersheet-ez.cloudfunctions.net"
    //WEB_SERVER_URL = window.location.origin;
  }
else {
  //WEB_SERVER_URL = "https://us-central1-answersheet-ez.cloudfunctions.net"
  WEB_SERVER_URL = "http://localhost:5000/answersheet-ez/us-central1"
  }

const WEB_SERVER_API_URL = WEB_SERVER_URL + "/app";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: WEB_SERVER_API_URL,
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