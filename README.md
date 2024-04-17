# Vite + React + Tailwind CSS + RainbowKit!

## To install dependencies

`npm install` or `npm install -f`

## Compile smart contracts

`npx hardhat compile`

## Run coverage

`npx hardhat coverage`

## To run the project locally

`npm run dev`

## Run deploy script from root project: 

`npx hardhat run scripts/deploy.js --network sepolia`

## Explanations
Step 1: Replace with your key in the .secrets.json file
Step 2: Run deploy script using: npx hardhat run scripts/deploy.js --network sepolia
Step 3: From the console, take the two addresses and modify them in the .env

## *****  

From the current implementation of the ERC20 contract, the one who does the deploy will receive the totalSupply.