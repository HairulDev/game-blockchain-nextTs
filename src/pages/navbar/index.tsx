import type { NextPage } from 'next';
import React, { useContext } from 'react';
import { MyContext } from 'context/MyContextProvider';
import Loader from '../../components/Loader';
import { AiFillPlayCircle, AiOutlineAppstore } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';

import Link from 'next/link';

const Navbar: NextPage = () => {
  const {
    connectWallet,
    currentAccount,
    disconnectWallet,
    tokenPet,
    getPet,
    happiness,
    hunger
  }: any = useContext(MyContext);

  return (
    <nav className="w-full mt-5 flex md:justify-center justify-between items-center">
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {currentAccount ? (
          <>
            <li className="bg-[#2952e3] flex flex-row justify-center items-center mx-auto py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
              <AiOutlineAppstore className="text-white mr-1" />
              <p className="text-white text-base font-semibold">
                <Link href={'/'}>Home</Link>
              </p>
            </li>
            <li className="bg-[#2952e3] flex flex-row justify-center items-center mx-auto py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
              <SiEthereum className="text-white mr-1" />
              <p className="text-white text-base font-semibold">
                {' '}
                <Link href={'/pets'}>Your pet</Link>
              </p>
            </li>
            <li
              className="bg-[#2952e3] flex flex-row justify-center items-center mx-auto py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
              onClick={disconnectWallet}
            >
              <AiFillPlayCircle className="text-white mr-1" />
              <p className="text-white text-base font-semibold">Disconnect Wallet</p>
            </li>
          </>
        ) : (
          <li
            className="bg-[#2952e3] flex flex-row justify-center items-center mx-auto py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={connectWallet}
          >
            <AiFillPlayCircle className="text-white mr-1" />
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
