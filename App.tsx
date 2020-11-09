import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { WelcomeScreen } from './screens/login';
import { SummaryScreen } from './screens/summary';
import * as SecureStore from 'expo-secure-store';
import { Animated, Easing, View, Dimensions } from 'react-native';
import { User } from './model/User';

const httpLink = createHttpLink({ uri: 'http://192.168.0.17:4000/' });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const deviceHeight = Dimensions.get('window').height;

export default function App() {
  const [logged, setLogged] = React.useState(false);
  const [animationFinished, setAnimationFinished] = React.useState(false);
  const [translationValue] = React.useState(new Animated.Value(-1 * deviceHeight));
  const [currentUser, setCurrentUser] = React.useState<User>();

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
  }

  function navigateToSummary(token: string, user: User) {
    setToken(token);
    setCurrentUser(user);
    setLogged(true);
    Animated.timing(translationValue, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.elastic(0.8)
    }).start(() => setAnimationFinished(true));
  }

  return (
    <ApolloProvider client={client}>
      <Animated.View style={{ flexDirection: 'column', transform: [{translateY: translationValue}] }}>
        <View style={{ height: deviceHeight }}>
          <SummaryScreen user={currentUser} logged={logged} displayed={animationFinished} ></SummaryScreen>
        </View>
        <View style={{ height: deviceHeight }}>
          <WelcomeScreen setUser={navigateToSummary}></WelcomeScreen>
        </View>
      </Animated.View>
    </ApolloProvider>
  );
}




