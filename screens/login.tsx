import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Easing } from 'react-native';
import { Animated } from 'react-native';
import { BottomDecoration } from '../components/login/bottom-decoration';
import { NimiusButton } from '../components/login/nimius-button';

export function WelcomeScreen(props: { setToken: (token:string) => void} ) {
  const [fadeValue] = React.useState(new Animated.Value(0));
  const [translateValue] = React.useState(new Animated.Value(0));
  const [bottomTranslate] = React.useState(new Animated.Value(0));
  const [bottomTranslate2] = React.useState(new Animated.Value(0));
  const [isShown, setShown] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  function loginPressed() {
    if (isShown) {
      animate();
    } else {
      login();
    }
  }

  const LOGIN_MUTATION = gql`
      mutation LoginMutation($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `;

  const [loginMutation, { data }] = useMutation(LOGIN_MUTATION);

  async function login() {
    if (!username) {
      setError('Introduce your username')
      return;
    }
    if (!password) {
      setError('Introduce your password')
      return;
    }
    try {
      const r = await loginMutation({ variables: { username, password } });
      props.setToken(r.data.login.token);
    } catch (e) {
      const errors = e.graphQLErrors;
      if (!errors) throw e;
      const error = errors[0];
      if (error.message === 'No user found' || error.message === 'Invalid password') {
        setError(error.message);
      } else if (error.message) {
        setError('Could not connect');
      }
    }
  }

  function animate() {
    Animated.parallel(
      [
        Animated.timing(fadeValue, {
          toValue: isShown ? 1 : 0,
          duration: 700,
          easing: Easing.elastic(1),
          useNativeDriver: true,
          delay: isShown ? 100 : 0
        }),
        Animated.timing(translateValue, {
          toValue: isShown ? -70 : 0,
          duration: 800,
          easing: Easing.elastic(1),
          useNativeDriver: true
        }),
        Animated.timing(bottomTranslate, {
          toValue: isShown ? 50 : 0,
          duration: 800,
          easing: Easing.elastic(1),
          useNativeDriver: true
        }),
        Animated.timing(bottomTranslate2, {
          toValue: isShown ? 120 : 0,
          duration: 800,
          easing: Easing.elastic(1),
          useNativeDriver: true
        })
      ]
    ).start();

    setShown(prev => !prev);
  }
  return (
    <>
      <View style={styles.container}>
        <Animated.View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', transform: [{translateY: translateValue}] }}>
          <Image source={require('../assets/logo.png')} style={ styles.logoImage }></Image>
        </Animated.View>
        <Animated.View style={{ opacity: fadeValue, height: 0, transform: [{ translateY: -60 }] }}>
          <View style={{ height: 150 }}>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.textInput} autoCapitalize="none"></TextInput>
            <TextInput secureTextEntry={true} placeholder="Password" value={password} onChangeText={setPassword} style={[styles.textInput, {marginTop: 20}]}></TextInput>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: bottomTranslate2 }], flex: 1}}>
          <NimiusButton title="Iniciar sesión" onPress={loginPressed} type="blue" />
          <NimiusButton title="Entrar sin cuenta" type="white" />
        </Animated.View>
      </View>
      <Animated.View style={{ transform: [{ translateY: bottomTranslate }], flex: 1 }}>
        <BottomDecoration />
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.7,
    flexDirection: 'column',
    padding: 40,
    paddingTop: 60,
    marginBottom: 20
  },

  title: {
    fontWeight: "900",
    fontSize: 36,
    color: '#484848'
  },

  logoImage: {
    width: 100,
    height: 100
  },

  button: {
    borderRadius: 15,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },

  buttonRaised: {
    color: 'white',
    backgroundColor: '#09D2E3',
  },

  buttonWhite: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#484848'
  },

  buttonText: {
    fontWeight: '900',
    fontSize: 20
  },

  buttonRaisedText: {
    color: 'white',
  },

  buttonWhiteText: {
    color: '#484848'
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 15
  },

  errorText: {
    color: '#E85055',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  }
})
