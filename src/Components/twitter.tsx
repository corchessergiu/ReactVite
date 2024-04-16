import { BsTwitter } from "react-icons/bs";
import React, { createContext, useContext, useEffect } from "react";
import { useAccount } from "wagmi";
import { providers } from "ethers";
import frontendLibQ from "../frontend-library/libraries/ERC20Interaction.js";

export default function Twitter() {
  const feLibQ = frontendLibQ();
  const { address: currentAddress, connector } = useAccount();
  const [signer, setSigner] = React.useState();

  React.useEffect(() => {
    (async function () {
      try {
        const _provider = await connector?.getProvider();
        if (!_provider) return setSigner(undefined);
        const provider = new providers.Web3Provider(_provider);

        const _signer = provider.getSigner();
        if (_signer) {
          setSigner(_signer);
        } else {
          setSigner(undefined);
        }
      } catch (error) {
        setSigner(undefined);
      }
    })();
  }, [connector]);

  useEffect(() => {
    console.log(signer);
  }, [signer]);

  useEffect(() => {
    if (signer) getERC20Balance();
  }, [signer]);

  async function getERC20Balance() {
    let balance = await feLibQ.getERC20Balance(signer, currentAddress);
    console.log(balance);
  }

return (
  <div className="flex justify-center gap-4">
    <div>
      <button
        type="button"
        className="bg-green-600 text-white text-lg font-bold py-3 px-6 rounded-full hover:bg-green-700 transition duration-300"
      >
        Contribute
      </button>
    </div>
    <div>
      <button
        type="button"
        className="bg-red-600 text-white text-lg font-bold py-3 px-6 rounded-full hover:bg-red-700 transition duration-300"
      >
        Withdraw
      </button>
    </div>
  </div>
);


}
