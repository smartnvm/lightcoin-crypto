/*
Here's a list of features that our code needs to support:

Allow multiple accounts to be created  -> class account
Each account can have many transactions  -> property
Allow withdrawals and deposits into accounts  -> methods
Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
Allow us to retrieve the current balance of the account at any time
Don't allow withdrawals that exceed the remaining balance of the account


*/


class Account {
  constructor() {
    //this.account = username;
    this.transactions = []
    this.balance = 0;
  }

  getbalance() {
    this.balance = 0
    for (let t of this.transactions) {
      this.balance += t.val
    }
    return this.balance;
  }


  addTranaction(transaction) {
    this.transactions.push(transaction)
  }

  history() {
    console.log("Transaction History\n", this.transactions)
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;

  }

  commit() {
    if (!this.checkNSF()) return false;

    this.time = new Date();
    this.account.addTranaction(this)
  }
}

class Deposit extends Transaction {

  get val() {
    //this.account.balance +=this.amount;
    return this.amount;
  }

  checkNSF() {
    // note how it has access to this.account b/c of parent
    return true
  }

}

class Withdrawal extends Transaction {

  get val() {
    //console.log('with',this.val)
    return -this.amount;

  }

  checkNSF() {
    // note how it has access to this.account b/c of parent
    let runningBalance = this.account.getbalance()
    //console.log('running:',runningBalance - this.amount >=0 )
    return  (runningBalance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW

const myAccount = new Account('Sponge Bob');

console.log('Starting Balance:', myAccount.getbalance());

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('ending balance:', myAccount.getbalance())
//console.log(myAccount.transactions);
