import type { NextPage } from 'next';
import React, { useContext, FC } from 'react';
import { MyContext } from 'context/MyContextProvider';
import Loader from '../../components/Loader';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { shortenAddress } from 'utils/shortenAddress';
import Navbar from '@pages/navbar';

interface InputProps {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}
const Transaction: FC = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
    balance,
    tokenPet
  }: any = useContext(MyContext);

  const handleSubmit = (e: any) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between">
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 ">
          <div className="p-5 flex flex-col flex-1 items-center justify-start w-full mf:mt-0 border-1 border-white  blue-glassmorphism ">
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-100 w-full my-2 eth-card white-glassmorphism ">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{balance && `${balance} ETH`} </p>
                </div>
                <div>
                  <p className="text-white font-light text-sm">{shortenAddress(currentAccount)}</p>
                  <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
                </div>
              </div>
            </div>
            <div className="p-3  w-full flex flex-col justify-start items-center white-glassmorphism">
              <input
                placeholder="Send To"
                name="addressTo"
                type="text"
                step="0.0001"
                onChange={(e) => handleChange(e, 'addressTo')}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
              />
              <input
                placeholder="Amount (ETH)"
                name="amount"
                type="number"
                step="0.0001"
                onChange={(e) => handleChange(e, 'amount')}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
              />
              <select
                name="tokenId"
                onChange={(e) => handleChange(e, 'tokenId')}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
              >
                {tokenPet > 0 ? (
                  <>
                    <option value={tokenPet}>Choice Pet (NFT)</option>
                    <option value={tokenPet}>Pet Green</option>
                  </>
                ) : (
                  <option></option>
                )}
              </select>

              <input
                placeholder="Keyword"
                name="keyword"
                type="text"
                step="0.0001"
                onChange={(e) => handleChange(e, 'keyword')}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
              />
              <input
                placeholder="Enter Message"
                name="message"
                type="text"
                step="0.0001"
                onChange={(e) => handleChange(e, 'message')}
                className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
              />
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 hover:bg-[#2a3b64] border-[#3d4f7c] bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Transfer
                </button>
              )}
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Transaction;
