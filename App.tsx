import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client'
import { WelcomeScreen } from './screens/login';
import { SummaryScreen } from './screens/summary';

const client = new ApolloClient({
  uri: 'http://192.168.0.18:4000/',
  cache: new InMemoryCache()
});

const USERS_QUERY = gql`
  query {
    users {
      id
      expenses {
        description
        type
        cost
      }
    }
  }`;
export default function App() {
  const { data, loading, error } = useQuery(USERS_QUERY, { client });
  const logged = false;

  return (
    <ApolloProvider client={client}>
      { !logged ? <WelcomeScreen></WelcomeScreen> : (
        <SummaryScreen></SummaryScreen>
      )}
    </ApolloProvider>
  );
}




