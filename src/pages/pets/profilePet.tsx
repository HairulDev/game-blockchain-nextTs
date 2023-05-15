import React, { useContext, FC } from 'react';
import { MyContext } from 'context/MyContextProvider';
import { SiEthereum } from 'react-icons/si';
import { isEmpty } from 'utils/helper';
import { shortenAddress } from 'utils/shortenAddress';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePet: FC = () => {
  const { deletePet, tokenPet, error } = useContext(MyContext);
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <div className="font-bold text-gray-500 text-sm mb-5">Your Pet</div>
      {!isEmpty(error) && (
        <button className="button text-white w-auto border-[1px] p-1 hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full cursor-pointer">
          {error}
        </button>
      )}
      <div>
        <Image
          alt="alt"
          src={`/assets/images/zeptolab.png`}
          className={`mx-auto`}
          height={200}
          width={200}
        />
        <p className="font-bold text-gray-500 text-sm">
          {tokenPet ? `NFT : ${shortenAddress(tokenPet)}` : "You don't have a pet"}
        </p>
        <div className="flex font-bold text-gray-500 text-sm p-2">
          <button
            className={`flex items-center justify-center text-white w-[100px] mt-2 border-[1px] p-2 hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full mr-2`}
          >
            <SiEthereum />
            <Link href={`/transaction`}>Sell Pet</Link>
          </button>
          <button
            onClick={deletePet}
            className={`text-white w-[100px] mt-2 border-[1px] p-2 hover:bg-[#c21146] border-[#e6205c] bg-[#e6205c] rounded-full`}
          >
            Del Pet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePet;
