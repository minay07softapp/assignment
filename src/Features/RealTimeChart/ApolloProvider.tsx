import React, { ReactNode } from 'react';
import {
  split, HttpLink, ApolloProvider, ApolloClient, InMemoryCache,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
  uri: 'ws://react.eogresources.com/graphql',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'https://react.eogresources.com/graphql',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
type Props = {
  children: ReactNode;
};
export default ({ children }: Props) => <ApolloProvider client={client}>{children}</ApolloProvider>;
