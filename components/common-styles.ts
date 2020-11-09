import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  borderedSquare: {
    width: '100%',
    height: 100,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 30,
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
})