import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { commonStyles } from '../common-styles';
type Props = {
  totalLimit: number,
  basicTotal: number,
  leisureTotal: number,
  canAnimate: boolean
}

export function TotalSummarySquare(props: Props) {
  const [basicTotalAnimated] = React.useState(new Animated.Value(0));

  const [leisureTotalAnimated] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if ( props.canAnimate && props.basicTotal && props.leisureTotal )
      animate();
  }, [props.canAnimate, props.basicTotal, props.leisureTotal])



  function animate() {
    Animated.parallel([
      Animated.timing(basicTotalAnimated, {
        toValue: (props.basicTotal / props.totalLimit) * 100,
        duration: 100 * Math.sqrt(props.basicTotal),
        easing: Easing.out(Easing.sin),
        useNativeDriver: false
      }),
      Animated.timing(leisureTotalAnimated, {
        toValue: (props.leisureTotal / props.totalLimit) * 100,
        duration: 100 * Math.sqrt(props.leisureTotal),
        easing: Easing.out(Easing.sin),
        useNativeDriver: false
      }),
    ]).start();
  }
  return (
    <View style={commonStyles.borderedSquare}>
      <View style={styles.row}>
        <Text style={styles.currentNumber}>{(props.basicTotal + props.leisureTotal) || 0}€</Text>
        <View style={styles.totalContainer}>
          <Text style={[styles.totalText, {fontSize: 16, fontWeight: 'bold'}]}>Total</Text>
          <Text style={styles.totalText}>{props.totalLimit}€</Text>
        </View>
      </View>
      <View style={[styles.row, {paddingTop: 0}]}>
        <View style={styles.totalProgressBar}>
          <Animated.View style={[styles.progressBar, {
            width: basicTotalAnimated.interpolate({ inputRange: [0,100], outputRange: ['0%', '100%'] }) }]
          }></Animated.View>
          <Animated.View style={[styles.progressBar, {
            backgroundColor: '#9113E2',
            width: leisureTotalAnimated.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
            marginLeft: -8,
            zIndex: -1}]
          }></Animated.View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  borderedSquare: {
    width: '100%',
    height: 100,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20
  },

  currentNumber: {
    fontWeight: '900',
    fontSize: 30,
    color: '#484848'
  },

  totalContainer: {
    alignItems: 'flex-end'
  },

  totalText: {
    color: '#CCC',
    fontWeight: '900',
    fontSize: 20
  },

  totalProgressBar: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    height: 15,
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row'
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#09D2E3',
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13
  }
});