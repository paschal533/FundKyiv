const path = require("path");
const HDWalletProviderV2 = require("@truffle/hdwallet-provider");

const privateKey = ''; // input your Celo private key here

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      version: '0.8.0',
      parser: 'solcjs'
    }
  },
  contracts_build_directory: path.join(__dirname, '../frontend/contracts'),
  networks: {
    develop: {
      port: 8545,
    },
    alfajores: {
      networkCheckTimeout: 10000,
      provider: function() {
        return new HDWalletProviderV2({
          privateKeys: [privateKey],         // Adding the account private key used for sending transactions
          providerOrUrl: `https://alfajores-forno.celo-testnet.org`    // Celo provides public RPC services for testnet
        })
      },
      network_id: '44787',         // Celo testnet networkId is 44787
      timeoutBlocks: 200,
      gas: 20000000
    },
  }
};