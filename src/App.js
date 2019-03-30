import React, { Component } from 'react';
import './App.css';
import TransactionTable from './views/TransactionTable/TransactionTable.js';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageValue: "",
      address: "0",
      balance: 0,
      transactions: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let address = this.state.address;
    if(address !== "") {
      setInterval(async () => {
          function satToBtc(x) {
              return x * 0.00000001;
          };

            const baseURL = 'https://blockchain.info/rawaddr/';
            const combURL = baseURL + address;

            axios.get(combURL)
              .then((response) => {
                // handle success
                console.log(response);

                let transactions = [];

                for(var i=0;i<response.data.txs.length; i++) {
                  var newTransaction = {
                    hash: response.data.txs[i].hash,
                    amount: satToBtc(response.data.txs[i].size),
                  }
                  transactions.push(newTransaction);
                  this.setState({transactions: transactions});
                }
                this.setState({balance: satToBtc(response.data.final_balance)});
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              });
        }, 10000);
     }
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
    this.setState({transactions: []});

    if(messageValue !== "") {
      const baseURL = 'https://blockchain.info/rawaddr/';
      const combURL = baseURL + messageValue;
      this.setState({address: messageValue});

      axios.get(combURL)
        .then((response) => {
          // handle success
          console.log(response);

          let transactions = this.state.transactions;

          for(var i=0;i<response.data.txs.length; i++) {
            var newTransaction = {
              hash: response.data.txs[i].hash,
              amount: satToBtc(response.data.txs[i].size),
            }
            transactions.push(newTransaction);
            this.setState({transactions: transactions});
          }
          this.setState({balance: satToBtc(response.data.final_balance)});
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
        event.preventDefault();
    }
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
            <div className="animated fadeInLeft">
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
                  <p id="bal-label">Balance:</p>
                  <p id="bal-value">{this.state.balance} BTC</p>
                  <p id="address-label">Address:</p>
                  <p id="address-value">{this.state.address}</p>
                </div>
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
