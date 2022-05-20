// import { ApolloClient, InMemoryCache } from '@apollo/client';


// const client = new ApolloClient({
//     uri: 'https://big-eagle-34.hasura.app/v1/graphql',
//     headers: {
//       'x-hasura-admin-secret':
//         'eFmlEl4a7cBU6CqgXDrfc4B73fkEROu3e22fzrAaY2UpiMyehA0c81S0oudMWAgi',
//     },
//     cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'https://big-eagle-34.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret':
      'eFmlEl4a7cBU6CqgXDrfc4B73fkEROu3e22fzrAaY2UpiMyehA0c81S0oudMWAgi',
  },
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://big-eagle-34.hasura.app/v1/graphql',
  connectionParams: {
    headers: {
      'x-hasura-admin-secret':
        'eFmlEl4a7cBU6CqgXDrfc4B73fkEROu3e22fzrAaY2UpiMyehA0c81S0oudMWAgi',
    },
  }
}));

const splitLink = split(
({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
},
wsLink,
httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;