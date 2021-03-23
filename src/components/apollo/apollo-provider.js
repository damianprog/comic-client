import React from 'react';
import App from '../../App';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const Provider = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
