import type { NextPage } from 'next';
import React, { useContext, FC } from 'react';
import { MyContext } from 'context/MyContextProvider';
import Loader from '../../components/Loader';
import { AiFillPlayCircle, AiOutlineScan } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

import { shortenAddress } from 'utils/shortenAddress';
import { isEmpty } from 'utils/helper';
import { formatDate } from 'utils/formatDate';
import Image from 'next/image';

const Tamagotchi: FC = () => {
  const {
    statusTamagotchi,
    happiness,
    isFoodDropping,
    currentAccount,
    dropFood,
    hunger,
    feed,
    play,
    makePetHungry,
    lastFed,
    error,
    tokenPet,
    isLoading
  }: any = useContext(MyContext);

  interface Images {
    [key: number]: { image: string; status: string };
  }

  const happinessLevels: Images = {
    0: { image: '/assets/images/zeptolab hungry.png', status: '/assets/images/hungry.png' },
    1: { image: '/assets/images/zeptolab happy1.png', status: '/assets/images/yummy.png' },
    2: { image: '/assets/images/zeptolab happy2.png', status: '/assets/images/yummy.png' },
    3: { image: '/assets/images/zeptolab happy3.png', status: '/assets/images/yummy.png' },
    4: { image: '/assets/images/zeptolab happy4.png', status: '/assets/images/yummy.png' },
    5: { image: '/assets/images/zeptolab happy5.png', status: '/assets/images/yummy.png' }
  };
  const level = happinessLevels[happiness] || happinessLevels[0];
  const image = level.image;
  const status = level.status;

  let energy = (happiness / 5) * 100;

  return (
    <div className="w-full pt-1 flex justify-center items-center text-center text-white text-base font-semibold">
      <div className={`grid gap-1 grid-cols-1`}>
        <Image
          alt="alt"
          src={status}
          layout="fixed"
          className={`mx-auto ${isFoodDropping ? '' : 'button'}`}
          width={150}
          height={150}
        />
        {!isEmpty(error) && (
          <button className="button text-white w-auto border-[1px] p-1 border-[#3d4f7c] bg-[#3d4f7c] rounded-full cursor-pointer">
            {error[0]}
          </button>
        )}
        <Image
          alt="alt"
          src={image}
          layout="fixed"
          className={`mx-auto`}
          width={300}
          height={300}
        />

        <p className="font-bold text-gray-500 text-sm">
          {tokenPet ? `NFT : ${shortenAddress(tokenPet)}` : "You don't have a pet"}
        </p>
        <div className="w-80 h-4 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${energy}%`,
              transition: 'width 1s ease-in-out'
            }}
          ></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-80">
          <Transition
            show={isFoodDropping}
            enter="transition ease-out duration-500"
            enterFrom="transform translate-y-0 opacity-0"
            enterTo="transform translate-y-80 opacity-100"
            leave="transition ease-out duration-500"
            leaveFrom="transform translate-y-80 opacity-100"
            leaveTo="transform translate-y-80 opacity-0"
          >
            <button
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              onClick={feed}
            >
              <Image
                alt="alt"
                // style={{ width: 'auto', height: '50px' }}
                width={300}
                height={300}
                src={`/assets/images/cookies.png`}
                className={`mx-auto button`}
              />
            </button>
          </Transition>
        </div>

        <div className="mt-10">
          <button
            onClick={dropFood}
            className={`text-white w-[100px] border-[1px] p-2 hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full cursor-pointer mr-4
${hunger >= 4 && !isFoodDropping ? 'button' : ''}`}
          >
            Feed
          </button>
          <button
            onClick={play}
            className={`text-white w-[100px] border-[1px] p-2 hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full 
${hunger <= 0 ? 'button' : ''}`}
          >
            Play
          </button>
          <p className="text-md text-gray-500 font-bold mt-5">Last fed: {formatDate(lastFed)}</p>
        </div>
      </div>
    </div>
  );
};

export default Tamagotchi;
