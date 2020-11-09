import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, TouchableNativeFeedbackBase, Easing } from 'react-native';
import { commonStyles } from '../common-styles';

type Props = {
  cascadeFade: Animated.Value,
  cascadeTrans: Animated.Value,
  colorInterpolation: Animated.AnimatedInterpolation,
  isBasic: boolean,
  setBasic: (value: boolean) => void
}
export function BasicLeisureSlider(props: Props) {
  const [current, setCurrent] = React.useState(props.isBasic);
  const [translateVal] = React.useState(new Animated.Value(0));

  const marginInterpolation = translateVal.interpolate({
    inputRange: [0, 100],
    outputRange: ['5%', '55%']
  })

  React.useEffect(() => {
    Animated.timing(translateVal, {
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
      toValue: props.isBasic ? 0 : 100
    }).start();
  }, [props.isBasic]);

  return (
    <>
      <Animated.View style={[commonStyles.borderedSquare, styles.container, { opacity: props.cascadeFade, transform: [{ translateY: props.cascadeTrans }] }]}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={ styles.column } onPress={() => props.setBasic(true)}>
            <Text style={ styles.title }>Basic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.column } onPress={() => props.setBasic(false)}>
            <Text style={ styles.title }>Leisure</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.slider, {
          marginLeft: marginInterpolation,
          backgroundColor: props.colorInterpolation
        }]}></Animated.View>
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginBottom: 30,
    marginTop: 0,
    height: 'auto',
    overflow: 'hidden'
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    color: '#484848',
    paddingTop: 15,
    paddingBottom: 15
  },
  slider: {
    borderRadius: 10,
    width: '40%',
    marginLeft: '5%',
    height: 8,
    backgroundColor: '#09D2E3',
    transform: [
      { translateY: -8 }
    ]
  }
});
