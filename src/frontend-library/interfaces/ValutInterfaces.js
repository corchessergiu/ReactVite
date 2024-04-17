import { ethers } from "ethers";
import Valut from "../abis/Valut.json";

export default (signerOrProvider, address) => {
  return new ethers.Contract(address, Valut.abi, signerOrProvider);
};
