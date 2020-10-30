import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

type Props = { value: number, color: 'blue' | 'purple', limit: number, canAnimate: boolean };

export function SimpleProgressBar(props: Props) {
  const [totalAnimated] = React.useState(new Animated.Value(0));
  function animate() {
    Animated.timing(totalAnimated, {
      toValue: (props.value / props.limit) * 100,
      duration: 100 * Math.sqrt(props.value),
      easing: Easing.out(Easing.sin),
      useNativeDriver: false
    }).start();
  }
  React.useEffect(() => {
    if (props.value !== undefined && props.canAnimate) {
      animate();
    }
  }, [props.value, props.canAnimate]);

  return (
    <View style={[styles.progressBarContainer, props.color==='purple' && styles.purpleContainer]}>
      <Animated.View style={[styles.progressBar, props.color==='purple' && styles.purpleBar, {
        width: totalAnimated.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%']
        })
      }]}></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    borderRadius: 20,
    height: 15,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#E5FBFC'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#09D2E3',
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    width: '50%'
  },
  purpleContainer: {
    backgroundColor: '#F4E7FC'
  },
  purpleBar: {
    backgroundColor: '#9113E2'
  }
})