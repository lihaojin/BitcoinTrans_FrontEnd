import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TransTableRow.css';

class TransTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="trans-tablerow">
          <div id="trans-hash">{this.props.hash}</div>
          <div id="amt-btc">{this.props.amount} BTC</div>
        </div>
      </div>
    );
  }
}

export default TransTableRow;
