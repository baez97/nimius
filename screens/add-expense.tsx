import React from 'react';
import { TextInput, Text, Animated, StyleSheet, Image, Easing, TouchableOpacity } from 'react-native';
import { BasicLeisureSlider } from '../components/add-expense/basic-leisure-slider.component';
import { IncreaseButton } from '../components/add-expense/increase-button.component';
import { commonStyles } from '../components/common-styles';
import Unsplash, { toJson } from 'unsplash-js';
import { gql, useLazyQuery } from '@apollo/react-hooks';


type Props = { canAnimate: boolean, back: any };
export function AddExpenseScreen(props: Props) {
  const [cost, setCost] = React.useState<number>();
  const [isBasic, setBasic] = React.useState(true);
  const [description, setDescription] = React.useState<string>();
  const [fadeValue] = React.useState(new Animated.Value(0));
  const [newExpenseTrans] = React.useState(new Animated.Value(500));
  const [newExpenseFade] = React.useState(new Animated.Value(1));
  const [cascadeFade1]   = React.useState(new Animated.Value(0));
  const [cascadeFade2]   = React.useState(new Animated.Value(0));
  const [cascadeFade3]   = React.useState(new Animated.Value(0));
  const [cascadeTrans1]  = React.useState(new Animated.Value(20));
  const [cascadeTrans2]  = React.useState(new Animated.Value(20));
  const [cascadeTrans3]  = React.useState(new Animated.Value(20));

  const [colorValue] = React.useState(new Animated.Value(0));
  const [secondInput, setSecondInput] = React.useState<any>();
  const [photoUrl, setPhotoUrl] = React.useState<string>();
  // const [createExpenseQuery] = useLazyQuery(gql``);

  const colorInterpolation = colorValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(9, 210, 217, 1)', 'rgba(145, 19, 226, 1)']
  });
  const animConfig = {
    duration: 500,
    useNativeDriver: true,
    easing: Easing.out(Easing.ease),
    toValue: 1,
  };
  const animConfigOut = {
    duration: 300,
    useNativeDriver: true,
    easing: Easing.in(Easing.ease),
    toValue: 1
  }

  React.useEffect(() => {
    if (props.canAnimate)
      Animated.parallel([
        Animated.timing(newExpenseTrans, { ...animConfig, toValue: 0, duration: 400 }),
        Animated.timing(fadeValue, { ...animConfig, useNativeDriver: false, duration: 400 }),
        Animated.timing(cascadeFade1, { ...animConfig, delay: 300 }),
        Animated.timing(cascadeTrans1, { ...animConfig, delay: 300, toValue: 0 }),
        Animated.timing(cascadeFade2, { ...animConfig, delay: 500 }),
        Animated.timing(cascadeTrans2, { ...animConfig, delay: 500, toValue: 0 }),
        Animated.timing(cascadeFade3, { ...animConfig, delay: 800 }),
        Animated.timing(cascadeTrans3, { ...animConfig, delay: 800, toValue: 0 }),
      ]).start();
  }, [props.canAnimate]);

  function animateGoBack() {
    Animated.parallel([
      Animated.timing(cascadeFade3, { ...animConfigOut, toValue: 0 }),
      Animated.timing(cascadeTrans3, { ...animConfigOut, toValue: 100 }),
      Animated.timing(cascadeFade2, { ...animConfigOut, delay: 200, toValue: 0 }),
      Animated.timing(cascadeTrans2, { ...animConfigOut, delay: 200, toValue: 200 }),
      Animated.timing(cascadeFade1, { ...animConfigOut, delay: 300, toValue: 0 }),
      Animated.timing(cascadeTrans1, { ...animConfigOut, delay: 300, toValue: 200 }),
      Animated.timing(newExpenseTrans, { ...animConfigOut, delay: 400, toValue: 200 }),
      Animated.timing(newExpenseFade, { ...animConfigOut, delay: 400, toValue: 0 }),
      Animated.timing(fadeValue, { ...animConfigOut, delay: 400, toValue: 0, useNativeDriver: false}),
    ]).start(() => props.back());
  }

  function switchBasic(isBasic: boolean) {
    Animated.timing(colorValue, { useNativeDriver: false, duration: 400, toValue: isBasic ? 0 : 100, easing: Easing.out(Easing.ease) }).start();
    setBasic(isBasic);
  }

  function createExpense() {
    const today = new Date();
    const expense = {
      description,
      cost,
      isBasic,
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear()
    };

  }

  return (
    <Animated.View style={{
      backgroundColor: fadeValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
    }), position: 'absolute', top: 0, left: 0, flex: 1, width: '100%', height:'100%', padding: 40, paddingTop: 60 }}>
      <Animated.View style={{opacity: newExpenseFade, transform: [{ translateY: newExpenseTrans }]}}>
        <TextInput style={styles.newExpenseInput} placeholder="New expense... 💰" autoFocus={true} blurOnSubmit={false} onSubmitEditing={() => secondInput?.focus()} value={description} onChangeText={setDescription}></TextInput>
      </Animated.View>
      <Animated.View style={{ opacity: cascadeFade1, transform: [{translateY: cascadeTrans1}], flexDirection: 'row', alignItems: 'center' }}>
        <TextInput keyboardType="numeric" ref={input => setSecondInput(input)} style={styles.newExpenseInput} placeholder="Cost" value={cost ? cost + '' : undefined} onChangeText={val => setCost(+val)}></TextInput>
        <IncreaseButton value={5} onPress={val => setCost(prev => prev ? prev + val : val)} colorInterpolation={colorInterpolation}></IncreaseButton>
        <IncreaseButton value={10} onPress={val => setCost(prev => prev ? prev + val : val)} colorInterpolation={colorInterpolation}></IncreaseButton>
      </Animated.View>
      <BasicLeisureSlider cascadeFade={cascadeFade2} cascadeTrans={cascadeTrans2} isBasic={isBasic} setBasic={switchBasic} colorInterpolation={colorInterpolation}></BasicLeisureSlider>
      <Animated.View style={{flexDirection: 'row', justifyContent: 'space-between', opacity: cascadeFade3, transform: [{translateY: cascadeTrans3}]}}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center'}} onPress={animateGoBack}>
          <Animated.Image source={require('../assets/back.png')} style={{height: 60, width: 60, tintColor: colorInterpolation}}></Animated.Image>
        </TouchableOpacity>
        <Animated.View style={[commonStyles.button, commonStyles.buttonRaised, { flex: 3, overflow: 'hidden', marginTop: 0, backgroundColor: colorInterpolation}]}>
          <TouchableOpacity style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}} onPress={createExpense}>
            <Text style={[commonStyles.buttonText, commonStyles.buttonRaisedText]}>Add expense</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      { photoUrl && <Image source={{ uri: photoUrl }} style={{ width: 200, height: 200 }}></Image>}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  newExpenseInput: {
    borderColor: '#CCCCCC',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    fontWeight: '900',
    color: '#484848',
    fontSize: 16,
    marginBottom: 30,
    width: '100%'
  },

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
});