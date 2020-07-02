import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value}: Request): Transaction | null{
    
    const balance = this.transactionsRepository.getBalance();

    const total = balance.total

    if(type == 'outcome' && total < value) {
      throw Error('Transaction is not valid!');
    }

    const transactionRepository = this.transactionsRepository.create({title, value, type});

    return transactionRepository || null;
  }
}

export default CreateTransactionService;
