import ValutContract from "../interfaces/ValutInterfaces";
import ERC20 from "../interfaces/QERC20Interfaces";
import { ethers } from "ethers";

export default function frontLibValut() {
  async function approve(signer, amountToStake) {
    const ERC20Contract = ERC20(
      signer,
      import.meta.env.REACT_APP_ERC20_CONTRACT_ADDRES
    );
    let returnedMessage;
    try {
      let txApprove = await ERC20Contract.approve(
        import.meta.env.REACT_APP_VALUT_CONTRACT_ADDRESS,
        ethers.utils.parseEther(amountToStake.toString())
      );
      await txApprove
        .wait()
        .then(() => {
          returnedMessage = "Successful approved!";
          return returnedMessage;
        })
        .catch((error) => {
          returnedMessage = error;
          return returnedMessage;
        });
    } catch (error) {
      returnedMessage = "User rejected transaction!";
      return returnedMessage;
    }
    return returnedMessage;
  }

  async function contribute(signer, amountToStake) {
    const Valut = ValutContract(
      signer,
      import.meta.env.REACT_APP_VALUT_CONTRACT_ADDRESS
    );
    let returnedMessage;
    try {
      let txDeposit = await Valut.deposit(
        ethers.utils.parseEther(amountToStake.toString())
      );
      await txDeposit
        .wait()
        .then(() => {
          returnedMessage = "Successful deposit!";
          return returnedMessage;
        })
        .catch((error) => {
          returnedMessage = error;
          return returnedMessage;
        });
    } catch (error) {
      returnedMessage = "User rejected transaction!";
      return returnedMessage;
    }
    return returnedMessage;
  }

  async function withdraw(signer, amountToStake) {
    const Valut = ValutContract(
      signer,
      import.meta.env.REACT_APP_VALUT_CONTRACT_ADDRESS
    );
    let returnedMessage;
    try {
      let txDeposit = await Valut.withdraw(
        ethers.utils.parseEther(amountToStake.toString())
      );
      await txDeposit
        .wait()
        .then(() => {
          returnedMessage = "Successful deposit!";
          return returnedMessage;
        })
        .catch((error) => {
          returnedMessage = error;
          return returnedMessage;
        });
    } catch (error) {
      returnedMessage = "User rejected transaction!";
      return returnedMessage;
    }
    return returnedMessage;
  }

  async function getERC20Balance(signer, userAddress) {
    const ERC20 = ERC20(
      signer,
      import.meta.env.REACT_APP_ERC20_CONTRACT_ADDRES
    );
    const balance = await ERC20.balanceOf(userAddress);
    return ethers.utils.formatEther(balance);
  }

  async function getCurrentAllowance(signer, userAddress) {
    const ERC20Contract = ERC20(
      signer,
      import.meta.env.REACT_APP_ERC20_CONTRACT_ADDRES
    );
    const allowance = await ERC20Contract.allowance(
      userAddress,
      import.meta.env.REACT_APP_VALUT_CONTRACT_ADDRESS
    );

    return allowance;
  }

  async function getUserContribution(signer, userAddress) {
    const Valut = ValutContract(
      signer,
      import.meta.env.REACT_APP_VALUT_CONTRACT_ADDRESS
    );
    let balance = await Valut.getUserTokenBalance(userAddress);
    return balance;
  }

  return {
    approve,
    getERC20Balance,
    getCurrentAllowance,
    getUserContribution,
    contribute,
    withdraw,
  };
}
