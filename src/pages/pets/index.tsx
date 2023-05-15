import type { NextPage } from 'next';
import React, { useContext, FC } from 'react';
import { MyContext } from 'context/MyContextProvider';
import Loader from '../../components/Loader';
import { AiFillPlayCircle, AiOutlineScan } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

import { shortenAddress } from 'utils/shortenAddress';
import { isEmpty } from 'utils/helper';
import { formatDate } from 'utils/formatDate';
import ListPet from './listPet';
import ProfilePet from './profilePet';
import Navbar from '@pages/navbar';

const Pets: FC = () => {
  const { tokenPet }: any = useContext(MyContext);

  return (
    <>
      <div className="w-full pt-6 flex justify-center items-center text-center text-white text-base font-semibold">
        {/* <p className="text-gray-500 font-bold text-sm mb-2"> </p> */}
        {tokenPet > 0 ? <ProfilePet /> : <ListPet />}
      </div>
      <Navbar />
    </>
  );
};

export default Pets;
