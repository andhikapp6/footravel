import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://big-eagle-34.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret':
        'eFmlEl4a7cBU6CqgXDrfc4B73fkEROu3e22fzrAaY2UpiMyehA0c81S0oudMWAgi',
    },
    cache: new InMemoryCache(),
});

export default client;