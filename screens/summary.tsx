import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function SummaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>
      <View style={styles.borderedSquare}></View>
      <View style={styles.borderedSquare}></View>
      <View style={[styles.borderedSquare, { height: 400 }]}>
        <Text style={{ fontWeight: "bold" }}>Hello friend!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 80,
    flexDirection: 'column'
  },
  title: {
    fontWeight: "900",
    fontSize: 36,
    color: '#484848'
  },
  borderedSquare: {
    width: '100%',
    height: 100,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 30
  }
});