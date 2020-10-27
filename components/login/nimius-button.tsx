import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type Props = {
  type: 'blue' | 'purple' | 'white',
  title: string,
  style?: { [key: string]: any },
  onPress?: ((event: GestureResponderEvent) => void)
}

export function NimiusButton(props: Props) {
  return (
    <TouchableOpacity style={[styles.container, styles[props.type]]} onPress={props.onPress}>
      <Text style={[textStyles.buttonText, textStyles[props.type]]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  blue: {
    backgroundColor: '#09D2E3',
  },
  purple: {
    backgroundColor: '#9113E2'
  },
  white: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#484848'
  },
});

const textStyles = StyleSheet.create({
  buttonText: {
    fontWeight: '900',
    fontSize: 20
  },
  purple: {
    color: 'white'
  },
  blue: {
    color: 'white'
  },
  white: {
    color: '#484848'
  }
})