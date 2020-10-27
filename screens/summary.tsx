import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

const EXPENSES_QUERY = gql`
  query {
    expenses {
      description
      cost
    }
  }
`;

type Expense = {
  description: string,
  cost: number
};

export function SummaryScreen() {
  const { data, loading } = useQuery(EXPENSES_QUERY);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);

  React.useEffect(() => {
    setExpenses(data.expenses);
  }, [data]);

  if (loading)
    return <Text>Loading...</Text>
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>
      <View style={styles.borderedSquare}>
        <View style={summaryStyles.row}>
          <Text style={summaryStyles.currentNumber}>{expenses.reduce((prev, current) => prev + current.cost, 0)}€</Text>
          <View style={summaryStyles.totalContainer}>
            <Text style={[summaryStyles.totalText, {fontSize: 16, fontWeight: 'bold'}]}>Total</Text>
            <Text style={summaryStyles.totalText}>1200€</Text>
          </View>
        </View>
        <View style={[summaryStyles.row, {paddingTop: 0}]}>
          <View style={summaryStyles.totalProgessBar}>

          </View>
        </View>
      </View>
      <View style={styles.borderedSquare}></View>
      <View style={[styles.borderedSquare, { height: 400 }]}>
        <Text style={{ fontWeight: "bold" }}>{JSON.stringify(data)}</Text>
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
    fontSize: 30,
    color: '#484848'
  },
  borderedSquare: {
    width: '100%',
    height: 100,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 30,
  }
});

const summaryStyles = StyleSheet.create({
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
    fontSize: 35,
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

  totalProgessBar: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    height: 15,
    width: '100%'
  }
})