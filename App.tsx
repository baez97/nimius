import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { WelcomeScreen } from './screens/login';
import { SummaryScreen } from './screens/summary';
import * as SecureStore from 'expo-secure-store';
import { useLazyQuery } from '@apollo/react-hooks';

const httpLink = createHttpLink({ uri: 'http://192.168.0.18:4000/' });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


export default function App() {
  const [logged, setLogged] = React.useState(false);

  function setToken(token: string) {
    if (!token)
      return;

    SecureStore.setItemAsync('token', token);
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      }
    });
    client.setLink(authLink.concat(httpLink));
    setLogged(true);
  }

  return (
    <ApolloProvider client={client}>
      { !logged ?
          <WelcomeScreen setToken={setToken}></WelcomeScreen> :
          <SummaryScreen></SummaryScreen>
      }
    </ApolloProvider>
  );
}




