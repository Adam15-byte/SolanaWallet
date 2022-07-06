# Solana Mobile Wallet In React Native
Simple mobile wallet used to transact and store tokens on the solana blockchain. Current version operates on devnet exclusively.

Non-commercial project prepared as a task set our during application to Synthetify.

## Table of contents
* [General info](#general-info)
* [Technologies](#Technologies)
* [Screenshots](#Screenshots)
* [Further improvments](#Further-improvments)

## General info
The app supports and allows the user to perform multiple actions on the Solana blockchain:
 * Create a new wallet consisting of public and secret key
 * Use existing wallet and log in with secret key (To be implemented soon)
 * Change between Devnet, Testnet, and Mainnet (To be implemented soon)
 * On Devnet receive free airdrops of Sol token
 * Asynchronously update information about Sol balance in the wallet and provide dynamic information about its value in USD
 * Display transactions for the wallet, copy hash IDs of transactions
 * Display and copy public key of your wallet
 * Display your public key in form of a QRcode
 * Send transactions to other wallets (Currently throws an error. To be fixed soon)
 * Store the secret key in storage on the device.

## Technologies
* Typescript
* React Native CLI
* React Native AsyncStorage
* React Native Stack Navigation
* @solana/web3.js
* Moment
* Base58 Encoding/Decoding
* React Native QRrcode SVG
* React Native Clipboard
* Hooks: useEffect, useState, useContext, createContext, useCallback, memo

## Screenshots
![sample1](https://user-images.githubusercontent.com/64642323/177624339-83d01e22-215e-4e2b-a11b-b9d62c0250d7.png)
![sample2](https://user-images.githubusercontent.com/64642323/177624429-85c8665b-bc83-4ce6-9e67-fa2914163c92.png)
![sample3](https://user-images.githubusercontent.com/64642323/177624497-226be58b-6802-456c-9fa9-744a794fa19d.png)
![sample4](https://user-images.githubusercontent.com/64642323/177624591-06f0e3a6-7a54-41fa-95f1-dc7c2068e111.png)
![sample5](https://user-images.githubusercontent.com/64642323/177624650-43a92584-a746-4cb6-9617-b1138837fe1f.png)
![sample6](https://user-images.githubusercontent.com/64642323/177624700-83d90561-0c44-4b1a-b3b2-d41241ae582b.png)
![sample7](https://user-images.githubusercontent.com/64642323/177624772-11f29037-feaa-41b3-9c3f-b88d918de67b.png)
![sample8](https://user-images.githubusercontent.com/64642323/177624843-5ddfb7ff-b8d7-4d13-a031-1b071b8a43ba.png)

## Further improvments
* Create Screen to allow to import wallet from secret key that user provides
* Create a component and logic to allow changing between devnet, testnet and mainnet.
* Fix the sending module. Currently, even with right inputs, attempt to send a transaction throws and error: [ReferenceError: Can't find variable: Buffer]
* Add additional logic to validation of inputs, when trying to send a transaction
* Create a screen to view all transactions and limit the display of transactions on WalletScreen to X amount.
