const { ethers } = require("hardhat");

async function main() {
  console.log(hre.network.name);
  const network = hre.network.name;
  [deployer, add2, add3] = await ethers.getSigners();
  console.log(deployer.getAddress());
  const balance = await deployer.getBalance(); // get deployer balance

  console.log("Network:", network);
  console.log("Chain ID:", hre.network.config.chainId);
  console.log("Deployer address:", deployer.address); // log deployer address
  console.log("Deployer balance:", ethers.utils.formatEther(balance));

  console.log(`Deploying contracts to network ${network}...`);

  // Deploy Mock ERC20
  console.log("Deploying MockERC20...");
  const sourceNetworkToken = await ethers
    .getContractFactory("ERC20Contract")
    .then((factory) => factory.deploy()); // Pass synapseBridgeInstance.address as a constructor argument
  await sourceNetworkToken.deployed();
  console.log("Address of erc20")
    console.log(sourceNetworkToken.address);
  // Deploy Valut contract
  console.log("Deploying Valut...");
  const valut = await ethers
    .getContractFactory("TokenVault")
    .then((factory) => factory.deploy(sourceNetworkToken.address)); // Pass synapseBridgeInstance.address as a constructor argument
  console.log("Address of valut contract");
  console.log(valut.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
