import React from 'react';
import { View, Text, StyleSheet, Easing } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { Animated } from 'react-native';
import { TotalSummarySquare } from '../components/summary/total-summary';
import { Expense } from '../model/Expense';
import { useLazyQuery } from '@apollo/react-hooks';
import { User } from '../model/User';
import { BasicLeisureSummary } from '../components/summary/basic-leisure-summary';

const EXPENSES_QUERY = gql`
  query {
    users {
      description
      cost
    }
  }
`;

export function SummaryScreen(props: { user?: User, logged: boolean, displayed: boolean }) {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [totalLimit, setTotalLimit] = React.useState(0);

  const [basicTotal, setBasicTotal] = React.useState(0);
  const [leisureTotal, setLeisureTotal] = React.useState(0);

  function computeTotals(expenses: Expense[]) {
    let basic = 0;
    let leisure = 0;
    expenses.forEach(e => e.isBasic ? basic += e.cost : leisure += e.cost);
    setBasicTotal(basic);
    setLeisureTotal(leisure);
  }

  const [canAnimate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (props.user) {
      setExpenses(props.user.expenses);
      setTotalLimit(props.user.totalLimit);
      computeTotals(props.user.expenses);
    }
  }, [props.logged]);

  React.useEffect(() => {
    if (props.displayed && expenses.length) {
      animate();
    }
  }, [props.displayed, expenses])

  function animate() {
    setAnimate(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>
      <TotalSummarySquare basicTotal={basicTotal} leisureTotal={leisureTotal} totalLimit={totalLimit} canAnimate={canAnimate}/>
      <BasicLeisureSummary basicTotal={basicTotal} leisureTotal={leisureTotal}
        totalLimit={totalLimit}
        basicPercentage={props.user?.basicPercentage}
        leisurePercentage={props.user?.leisurePercentage}
        canAnimate={canAnimate} />
      <View style={[styles.borderedSquare]}>
        <Text style={{ fontWeight: "bold" }}>{JSON.stringify(expenses)}</Text>
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