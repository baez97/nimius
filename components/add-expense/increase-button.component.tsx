import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { commonStyles } from '../common-styles';

type Props = {
  value: number,
  onPress: (value: number) => void,
  colorInterpolation: Animated.AnimatedInterpolation
}

export function IncreaseButton(props: Props) {
  return (
    <Animated.View style={[styles.increaseButtonContainer, { backgroundColor: props.colorInterpolation }]}>
      <TouchableOpacity style={styles.increaseButton} onPress={() => props.onPress(props.value)}>
        <Text style={[commonStyles.buttonText, commonStyles.buttonRaisedText]}>{`+${props.value}€`}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  increaseButton: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  increaseButtonContainer: {
    marginBottom: 30,
    ...commonStyles.button,
    ...commonStyles.buttonRaised,
    marginTop: 0,
    paddingHorizontal: 10,
    height: 35,
    width: 'auto',
    transform: [
      {translateX: -155}
    ],
    overflow: 'hidden',
    marginRight: 10,
  }
})