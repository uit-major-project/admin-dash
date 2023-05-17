import { useMemo } from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
// const isProduction = process.env.NODE_ENV === 'production';

function createApolloClient() {
  // const uri = isProduction
  //   ? `https://${process.env.NEXT_PUBLIC_API_URL}`
  //   : 'http://localhost:4000';
  const uri = process.env.NEXT_PUBLIC_API_URL;

  console.log('env', process.env.NODE_ENV);

  console.log('uri', uri);

  // const creds =
  //   process.env.NODE_ENV === 'development' ? {} : { credentials: 'include' };

  // console.log(creds, process.env.NODE_ENV);

  const options =
    process.env.NODE_ENV === 'development' ? {} : { credentials: 'include' };

  console.log('options', options);

  const httpLink = createHttpLink({
    // uri: typeof window === 'undefined' ? `${uri}/api/graphql` : '/api/graphql',
    uri: `${uri}`,

    ...options,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = process.env.NEXT_PUBLIC_JWT;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      process.env.NODE_ENV === 'development'
        ? authLink.concat(httpLink)
        : httpLink,
    // credentials: 'include',
    // uri
    // ssrMode: typeof window === 'undefined',
  });
}

export function initializeApollo(
  initialState: any = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(
  initialState: any
): ApolloClient<NormalizedCacheObject> {
  // console.log('store:', store);
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
