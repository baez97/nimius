import { Expense } from "./Expense";

export type User = {
  username: string,
  totalLimit: number,
  basicPercentage: number,
  leisurePercentage: number,
  isBasic: boolean,
  expenses: Expense[]
}