import ERC20 from "../interfaces/QERC20Interfaces";
import { ethers } from "ethers";

export default function frontendLibQERC20() {

  async function getERC20Balance(signer, userAddress) {
    console.log("from library!!!")
    console.log(userAddress)
    console.log(signer)
    const QERC20 = ERC20(signer, "0x85ED9F3BC57586cE095CC7dfCA8cA503027A83E9");
    const balance = await QERC20.balanceOf(userAddress);
    console.log("balaces")
    console.log(balance)
  }

  
  return {
    getERC20Balance,
  };
}
