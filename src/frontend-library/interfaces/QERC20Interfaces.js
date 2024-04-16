import { ethers } from "ethers";
import QERC20 from "../abis/QERC20.json";

export default (signerOrProvider, address) => {
  return new ethers.Contract(address, QERC20.abi, signerOrProvider);
};
