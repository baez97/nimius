import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
export function WelcomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Image source={require('../assets/logo.png')} style={ styles.logoImage }></Image>
        </View>
        <View>
          <TouchableOpacity style={[styles.button, styles.buttonRaised]}>
            <Text style={[styles.buttonText, styles.buttonRaisedText]}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonWhite]}>
            <Text style={[styles.buttonText, styles.buttonWhiteText]}>Continuar sin cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', height: 80, marginTop: 20 }}>
          <View style={ [styles.decorSquare, styles.square1] }></View>
          <View style={ [styles.decorSquare, styles.square2] }></View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20}}>
          <View style={ [styles.decorSquare, styles.square3] }></View>
          <View style={{ flexDirection: 'column', flex: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={[ styles.decorSquare, styles.square4] }></View>
              <View style={[ styles.decorSquare, styles.square5] }></View>
            </View>
            <View style={[styles.decorSquare, styles.square6]}></View>
          </View>
        </View>
      </View>
    </>
  )
}

const noRightBorderRadius = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0
};

const noLeftBorderRadius = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 40,
    paddingTop: 60,
    justifyContent: 'space-between',
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

  decorSquare: {
    borderRadius: 15,
    height: 80,
    backgroundColor: '#09D2E3',
    marginRight: 20
  },

  square1: {
    flex: 1,
    ...noLeftBorderRadius
  },

  square2: {
    backgroundColor: '#E5FBFC',
    flex: 1,
    marginRight: 0,
    ...noRightBorderRadius
  },

  square3: {
    backgroundColor: '#F4E7FC',
    height: 180,
    width: 100,
    ...noLeftBorderRadius,
    flex: 1
  },

  square4: {
    flex: 1,
    backgroundColor: '#E5FBFC'
  },

  square5: {
    flex: 1,
    backgroundColor: '#F4E7FC',
    marginRight: 0,
    ...noRightBorderRadius
  },

  square6: {
    marginTop: 20,
    marginRight: 0,
    ...noRightBorderRadius
  },

})
