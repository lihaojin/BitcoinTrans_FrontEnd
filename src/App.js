import React, { Component } from 'react';
import './App.css';
import TransactionTable from './views/TransactionTable/TransactionTable.js';
import ReconnectingWebSocket from 'reconnecting-websocket'
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageValue: "",
      address: "",
      balance: 0,
      transactions: [],
      connected: false,
      ping: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      function satToBtc(x) {
          return x * 0.00000001;
      };

      const socket = new WebSocket('wss://ws.blockchain.info/inv');
      socket.debug = true;
      socket.timeoutInterval = 3000;
      const address = this.state.address;

      if(address !== "") {
        this.setState({ping: {"op":"addr_sub", "addr":address}});
      }
      else {
        this.setState({ping: {"op":"unconfirmed_sub"}});
      }

      socket.addEventListener('open', function (event) {
         const ping = JSON.stringify(this.state.ping)
         socket.send(ping)
         this.setState({connected:true})
      }.bind(this));

      socket.addEventListener('close', function(event) {
          this.setState({connected:false})
      }.bind(this));

      socket.addEventListener('error', function(event) {
          this.setState({connected:false})
      }.bind(this));

      socket.addEventListener('message', function(event) {
        const transactions = this.state.transactions
        const data = JSON.parse(event.data)

        var newTransaction = {
          hash: data.x.hash,
          amount: satToBtc(data.x.size).toFixed(8),
        }

        transactions.push(newTransaction)
        this.setState({transactions: transactions})
      }.bind(this));
   }

  handleChange(event) {
    this.setState({messageValue: event.target.value});
  }

  handleKeyPress(event) {
    var code = event.keyCode || event.which;
    if(code === 13 && code !== 16) {
        this.handleSubmit(event);
        this.setState({messageValue: ""});
        event.preventDefault();
    }
  }

  handleSubmit(event) {
    const messageValue = this.state.messageValue
    this.setState({address: messageValue})
  }

  render() {
    return (
      <div>
        <div className="animated fadeInDown">
          <div className="header">
            <div className="bitcoinlogo">
              <img src={require('./icons/goldbitcoinicon.png')} />
            </div>
            <div className="title">BitcoinTrans</div>
          </div>
        </div>

        <div className="animated fadeInUp">
          <div className="transactions">
              <div className="transaction-header">
                <div className="trans-header-title">Transactions for BTC Addresses</div>
                  <textarea
                    placeholder="Search by BTC address..."
                    value={this.state.messageValue}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    >
                  </textarea>
                  <div className="balance">
                    <p id="address-label">Address:</p>
                    <p id="address-value">{this.state.address}</p>
                    <p id="bal-label">Balance:</p>
                    <p id="bal-value">{this.state.balance} BTC</p>
                  </div>
                </div>
            <div id="transactiontable"> <TransactionTable transactions={this.state.transactions}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
