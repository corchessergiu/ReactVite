# Vite + React + Tailwind CSS + RainbowKit!

## To install dependencies

`npm install` or `npm install -f`

## Compile smart contracts

`npx hardhat compile`

## Run coverage

`npx hardhat coverage`

![Screenshot from 2024-04-17 23-01-47](https://github.com/corchessergiu/ReactVite/assets/61419684/144c9e94-ab73-47dc-bb84-19e74ba41b63)

## To run the project locally

`npm run dev`

## Run deploy script from root project: 

`npx hardhat run scripts/deploy.js --network sepolia`

## Explanations
## Step 1: Replace with your key in the .secrets.json file
## Step 2: Run deploy script using: npx hardhat run scripts/deploy.js --network sepolia
## Step 3: From the console, take the two addresses and modify them in the .env

## *****  

From the current implementation of the ERC20 contract, the one who does the deploy will receive the totalSupply.
