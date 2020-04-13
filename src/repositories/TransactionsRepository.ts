import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transactionFilter => transactionFilter.type === 'income')
      .reduce((sum, transaction) => sum + transaction.value, 0);

    const outcome = this.transactions
      .filter(transactionFilter => transactionFilter.type === 'outcome')
      .reduce((sum, transaction) => sum + transaction.value, 0);

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
