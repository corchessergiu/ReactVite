require("@nomiclabs/hardhat-waffle");

const { mnemonic } = require("./.secrets.json");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.25",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
          evmVersion: "cancun",
        },
      },
    ],
  },
  networks: {
    hardhat: {
      gas: 19000000,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
    sepolia: {
      url: "https://1rpc.io/sepolia",
      chainId: 11155111,
      accounts: { mnemonic: mnemonic },
      gas: 19000000,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
  },
};
