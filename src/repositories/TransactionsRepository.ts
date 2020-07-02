import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Request {
  title: string,
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transaction = this.transactions;
    return transaction;
  }

  public getBalance(): Balance {

    var income = 0;
    var outcome = 0;

    this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'income') {
        total = total + elemento.value;
        income = total;
        return income;  
      }
      else {
        total = total + elemento.value;
        outcome = total;
        return outcome;
      }
    }, 0);


    const balance = {
      income: income,
      outcome: outcome,
      total: income - outcome,
    }

    return balance;
  }

  public create({title, value, type}: Request): Transaction {

    const transaction = {
      id: uuid(),
      title, 
      value,
      type
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
