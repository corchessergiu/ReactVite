const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Test deposit function", async function () {
  let deployer, add2, add3;
  let valutContract, erc20;

  beforeEach("create the contract for testing every it", async () => {
    [deployer, add2, add3] = await ethers.getSigners();
    const Erc20 = await ethers.getContractFactory("ERC20Contract");
    erc20 = await Erc20.deploy();
    await erc20.deployed();

    const TokenVault = await ethers.getContractFactory("TokenVault");
    valutContract = await TokenVault.deploy(erc20.address);
    await valutContract.deployed();
  });

  it("Should attempt to deposit 0 tokens", async () => {
    await valutContract
      .deposit(ethers.utils.parseEther("0"))
      .then((res) => {
        assert.fail("must throw err");
      })
      .catch((err) => {
        expect(err.message).to.contain("Valut: Amount must be greater than 0");
      });
  });

  it("Should deposit", async () => {
    await erc20.approve(valutContract.address, ethers.utils.parseEther("1000"));
    for (let i = 0; i < 10; i++)
      await valutContract.deposit(ethers.utils.parseEther("10"));
    expect(await valutContract.balances(deployer.address)).to.equal(
      ethers.utils.parseEther("100")
    );
  });

    it("Should deposit and test contract balance", async () => {
      await erc20.approve(
        valutContract.address,
        ethers.utils.parseEther("1000")
      );    
      expect(await erc20.balanceOf(valutContract.address)).to.equal("0");

        await valutContract.deposit(ethers.utils.parseEther("100"));
      expect(await valutContract.balances(deployer.address)).to.equal(
        ethers.utils.parseEther("100")
      );

       expect(await erc20.balanceOf(valutContract.address)).to.equal(
         ethers.utils.parseEther("100")
       );
    });
});
