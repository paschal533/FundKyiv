# FundCFX

Fundme is a decentralised fundraiser application, where users can create a fundraising campaign, Donate to a fundraiser with CFX token and print the receipt of their donations. Fundme also has other additional features that allow users to send CFX to anyone across the world, view the amount of CFX they have in their wallet, view the NFTs they have, and view their last five transaction counts.

![screenshot](./Frontend/assets/home.png)

# 🛠 Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (NextJs & Testing)
- Ethers JS (Blockchain Interaction)
- Truffle (Development Framework)

# ⛓ Blockchain Protocol used

- ERC-720 standard

# ⚙ Requirements For Initial Setup
- Install NodeJS, should work with any node version below 16.5.0
- Install Truffle or CFXtruffle, In your terminal, you can check to see if you have CFXtruffle by running CFXtruffle --version. To install CFXtruffle `npm install -g conflux-truffle`. Ideal to have cfxtruffle version 1.0.3 to avoid dependency issues.

# 🚀 Quick Start

📄 Clone or fork FundCFX:

```
https://github.com/paschal533/FundCFX.git
```
💿 Install all dependencies:
 
```
$ cd FundCFX
$ cd frontend
$ npm install 
```

# 🚴‍♂️ Run your App:

```
npm run dev
```

- Note :- This app was deploy to Conflux eSpace testnet, so you need to connect your Metamask wallet to Conflux eSpace testnet before you can Interact with the app.

# 📄 interacting with the Smart-contract

```
$ cd FundCFX
$ cd smart-contract
$ npm install
```

# 🛠 Test the Smart-contract:

```
truffle test
```

# 🎗 Compile the Smart-contract:

```
truffle compile
```

# 🔗 Deploy the Smart-contract:

To do this, you need to provide your Conflux eSpace Matamask private key.
Add your Conflux eSpace Matamask private key to the "private key" varible provided for you in the `truffle-config.js` file.

Then run

```
truffle deploy --network espaceTest
```

Alternatively, you can deploy the Smart-contract to your local machine by running:

```
truffle deploy --network develop
```
# 📄 Smart-contract address

0xc5102d8a27580d18ae1fb44eb56745ade0f5f1b9

# 📜 Deployed smart-contract address

https://evmtestnet.confluxscan.net/address/0xc5102d8A27580D18Ae1Fb44eB56745ADE0f5f1B9


# 🥇 Blog post

[Learn more about Conflux and FundCFX](https://paschal.hashnode.dev/fundcfx-a-fundraiser-dapp-deployed-on-conflux-blockchain)