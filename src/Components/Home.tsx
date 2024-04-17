import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers, providers } from "ethers";
import frontendLibQ from "../frontend-library/libraries/ERC20Interaction.js";
import frontLibValut from "../frontend-library/libraries/ValutInteraction.js";
import { Spinner } from "./Spinner";

export default function Home() {
  const feLibERC20 = frontendLibQ();
  const feLibValut = frontLibValut();
  const { address: currentAddress, connector } = useAccount();
  const [signer, setSigner] = useState();
  const [amount, setAmount] = useState(0);
  const [amountWithdraw, setAmountWithdraw] = useState(0);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingContribute, setLoadingContribute] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [displayApprove, setDisplayApprove] = useState(false);
  const [displayWithdrawText, setdisplayWithdrawText] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentUserContribution, setcurrentUserContribution] = useState(0);

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
    if (signer && currentAddress) {
      getERC20Balance();
      getUserBalanceFunction();
    }
  }, [signer]);

  useEffect(() => {
    if (signer) {
      setApproveState();
    }
  }, [amount]);

  useEffect(() => {
    if (signer) {
      setWithdrawState();
    }
  }, [amountWithdraw]);

  async function setApproveState() {
    let currentAllowance = await feLibValut.getCurrentAllowance(
      signer,
      currentAddress
    );
    if (Number(ethers.utils.formatEther(currentAllowance)) < Number(amount)) {
      setDisplayApprove(true);
    } else {
      setDisplayApprove(false);
    }
  }

  async function setWithdrawState() {
    let currentBalance = await feLibValut.getUserBalance(
      signer,
      currentAddress
    );
    if (
      Number(ethers.utils.formatEther(currentBalance)) < Number(amountWithdraw)
    ) {
      setCurrentBalance(ethers.utils.formatEther(currentBalance.toString()));
      setdisplayWithdrawText(true);
    } else {
      setdisplayWithdrawText(false);
    }
  }

  async function getERC20Balance() {
    let balance = await feLibERC20.getERC20Balance(signer, currentAddress);
    return balance;
  }

  async function getUserBalanceFunction() {
    let balance = await feLibValut.getUserContribution(signer, currentAddress);
    setcurrentUserContribution(ethers.utils.formatEther(balance));
    return balance;
  }

  const handleContribute = async () => {
    let currentAllowance = await feLibValut.getCurrentAllowance(
      signer,
      currentAddress
    );
    if (Number(ethers.utils.formatEther(currentAllowance)) < Number(amount)) {
      setDisplayApprove(true);
    } else {
      setLoadingContribute(true);
      let result = await feLibValut.contribute(signer, amount);
      if (result === "Successful approved!") {
        setDisplayApprove(false);
      }
      setLoadingContribute(false);
    }
  };

  const handleApprove = async () => {
    setLoadingApprove(true);
    setLoadingContribute(true);
    let result = await feLibValut.approve(signer, amount);
    if (result === "Successful approved!") {
      setDisplayApprove(false);
      setLoadingApprove(false);
    }
    setLoadingContribute(false);
  };

  const handleWithdraw = async () => {
    let currentBalance = await feLibValut.getUserBalance(
      signer,
      currentAddress
    );
    if (
      Number(ethers.utils.formatEther(currentBalance)) < Number(amountWithdraw)
    ) {
      setCurrentBalance(ethers.utils.formatEther(currentBalance.toString()));
      setdisplayWithdrawText(true);
    } else {
      setdisplayWithdrawText(false);
      setLoadingContribute(false);
      let result = await feLibValut.contribute(signer, amountWithdraw);
      if (result === "Successful approved!") {
        setDisplayApprove(false);
      }
      setLoadingContribute(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>
        <span> Your current contribution :  {currentUserContribution} </span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div>
          <input
            type="text"
            placeholder="Amount"
            className="bg-black text-white text-lg font-bold py-3 px-6 rounded-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          {loadingContribute ? (
            <Spinner color={"green"} />
          ) : (
            <button
              type="button"
              className={`text-white text-lg font-bold py-3 px-6 rounded-full transition duration-300 ${
                signer === undefined
                  ? "bg-gray-600 hover:bg-gray-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={handleContribute}
              disabled={signer === undefined}
            >
              {displayApprove
                ? "Must approve first or try with a lower value--->>"
                : "Contribute"}
            </button>
          )}
        </div>
        {displayApprove && (
          <div>
            {loadingApprove ? (
              <Spinner color={"yellow"} />
            ) : (
              <button
                type="button"
                className="bg-yellow-600 text-white text-lg font-bold py-3 px-6 rounded-full hover:bg-yellow-700 transition duration-300"
                onClick={handleApprove}
              >
                Approve
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        <div>
          <input
            type="text"
            placeholder="Amount"
            className="bg-black text-white text-lg font-bold py-3 px-6 rounded-full"
            value={amountWithdraw}
            onChange={(e) => setAmountWithdraw(e.target.value)}
          />
        </div>
        <div>
          {loadingWithdraw ? (
            <Spinner color={"red"} />
          ) : (
            <button
              type="button"
              className={`text-white text-lg font-bold py-3 px-6 rounded-full transition duration-300 ${
                signer === undefined
                  ? "bg-gray-600 hover:bg-gray-600"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={handleWithdraw}
              disabled={signer === undefined}
            >
              {displayWithdrawText
                ? `Your actual balance is ${currentBalance}. Put less than that`
                : "Withdraw"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
