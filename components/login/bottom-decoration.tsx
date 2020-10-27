import React from 'react';
import { View, StyleSheet } from 'react-native';
export function BottomDecoration() {
  return (
    <>
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
    </>
  );
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