# BitcoinTrans 

**BitcoinTrans** is a web application utilizing Blockchain.info API to retrieve the most recent transactions for any given   address.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

## Install

    $ git clone https://github.com/ORG/PROJECT.git
    $ cd PROJECT
    $ npm install

## Start & watch

    $ npm start

**Note:** If cross-origin read blocking (CORB) is creating an issue with API calls, try to run on firefox using "BROWSER=firefox npm start"

**Side Note:** Merged recent changes to master 

**All Transactions**
<img src='https://github.com/lihaojin/BitcoinTrans_FrontEnd/blob/master/bitcointransgif.gif' />

**Selected Address Transactions**
<img src='https://github.com/lihaojin/BitcoinTrans_FrontEnd/blob/master/bitcointransgif2.gif' />



