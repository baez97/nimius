import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { commonStyles } from '../common-styles';
import Dash from 'react-native-dash';
import { SimpleProgressBar } from './simple-progress-bar';
type Props = {
  totalLimit: number,
  basicTotal: number,
  leisureTotal: number,
  basicPercentage?: number,
  leisurePercentage?: number,
  canAnimate: boolean
}
export function BasicLeisureSummary(props: Props) {
  const { basicLimit, leisureLimit } = React.useMemo(() => {
    if (!props.basicPercentage || !props.leisurePercentage)
      return { basicLimit: 1, leisureLimit: 1 };

    const basicLimit = ((props.basicPercentage / 100) * props.totalLimit);
    const leisureLimit = ((props.leisurePercentage / 100) * props.totalLimit);
    return { basicLimit, leisureLimit };
  }, [props.totalLimit, props.basicPercentage, props.leisurePercentage]);

  return (
    <View style={[commonStyles.borderedSquare, { flexDirection: 'row', overflow: 'hidden', alignItems: 'center' }]}>
      <View style={styles.columnContainer}>
        <TotalNumberText value={props.basicTotal}></TotalNumberText>
        <SimpleProgressBar limit={basicLimit} value={props.basicTotal} color="blue" canAnimate={props.canAnimate}></SimpleProgressBar>
      </View>
      <Dash dashGap={7} dashLength={7} dashThickness={1} dashColor="#CCCCCC" style={{width:1, height:60, flexDirection:'column'}}/>
      <View style={styles.columnContainer}>
        <TotalNumberText value={props.leisureTotal}></TotalNumberText>
        <SimpleProgressBar limit={leisureLimit} value={props.leisureTotal} color="purple" canAnimate={props.canAnimate}></SimpleProgressBar>
      </View>
    </View>
  );
}

function TotalNumberText(props: { value: number }) {
  let integer = Math.floor(props.value);
  let decimal = Math.floor(props.value % 1 * 100) + '';
  if (decimal.length < 1) decimal += '0';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <Text style={styles.totalText}>{integer}</Text>
      <Text style={styles.decimalText}>,{decimal}€</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  columnContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%'
  },
  totalText: {
    fontWeight: '900',
    fontSize: 30,
    color: '#484848'
  },
  decimalText: {
    fontSize: 20,
    color: '#CCCCCC',
    fontWeight: '900',
    marginBottom: 3
  },
  dashedBorderLeft: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CCCCCC',
    borderRadius: 1,
    height: 60,
    marginVertical: 20
  },
})