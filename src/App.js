import React, { Component } from 'react';
import './App.css';
import TransactionTable from './views/TransactionTable/TransactionTable.js';
import ReconnectingWebSocket from 'reconnecting-websocket'
const axios = require('axios');
const socket = new ReconnectingWebSocket('wss://ws.blockchain.info/inv');

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
     //convert satoshi to BTC
      function satToBtc(x) {
          return x * 0.00000001;
      };

      //Set socket properties
      socket.timeoutInterval = 1000;
      const address = this.state.address;

      //change state of ping if empty address state
      if(address === "") {
        this.setState({ping: {"op":"unconfirmed_sub"}});
      }

      //Add event listeners
      socket.addEventListener('open', function (event) {
         this.setState({connected:true})
         const ping = JSON.stringify(this.state.ping)
         socket.send(ping)
      }.bind(this));

      //onclose event
      socket.addEventListener('close', function(event) {
          this.setState({connected:false})
      }.bind(this));

      //onerror event
      socket.addEventListener('error', function(event) {
          this.setState({connected:false})
      }.bind(this));

      //onmessage event
      socket.addEventListener('message', function(event) {
          console.log(event.data)
          const transactions = this.state.transactions

          //limit transactions displayed
          if(transactions.length > 49) {
            transactions.shift()
          }

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
    function satToBtc(x) {
        return x * 0.00000001;
    };

    const messageValue = this.state.messageValue;
    this.setState({transactions: [],
                   address: messageValue
    });

    if(this.state.address === "") {
      //unsubscribe to unconfirmed transactions
      console.log("helloooooo");
      this.setState({ping: {"op":"unconfirmed_unsub"}});
      const ping = JSON.stringify(this.state.ping);
      socket.send(ping);
    }
    else {
      //unsubscribe to address
      this.setState({ping: {"op":"addr_unsub", "addr":this.state.address}});
      const ping = JSON.stringify(this.state.ping);
      socket.send(ping);
    }

    //Subscribe to new address
    this.setState({ping: {"op":"addr_sub", "addr":messageValue}});
    const newPing = JSON.stringify(this.state.ping);
    socket.send(newPing);

    const baseURL = 'https://blockchain.info/rawaddr/';
    const combURL = baseURL + messageValue;
    axios.get(combURL)
      .then((response) => {
        // handle success
        console.log(response);
        this.setState({balance: satToBtc(response.data.final_balance)});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
