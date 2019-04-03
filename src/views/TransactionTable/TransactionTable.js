import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TransactionTable.css'
import TransTableRow from '../../components/TransTableRow/TransTableRow.js';


class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="root">
        <div className="table-header">
          <div id="trans-hash">Hash</div>
          <div id="amt-btc">Amount (BTC)</div>
        </div>
        <div className="trans-table">
          <div className="table-body">
            {this.props.transactions.map(transactions => (
              <TransTableRow hash={transactions.hash} amount={transactions.amount} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionTable;
