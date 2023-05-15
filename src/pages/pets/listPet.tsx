import React, { useContext, FC } from 'react';
import { MyContext } from 'context/MyContextProvider';
import Image from 'next/image';

const ListPet: FC = () => {
  const { mint, tokenPet }: any = useContext(MyContext);

  return (
    <div className="w-full pt-6 flex justify-center items-center text-center text-white text-base font-semibold">
      <div className="mx-auto w-70 rounded-2xl bg-white p-2">
        <div className="font-bold text-gray-500 text-sm mb-12">Buy your pet</div>
        <div className="flex">
          <div className="rounded overflow-hidden shadow-lg p-1">
            <Image
              alt="alt"
              src={`/assets/images/zeptolab.png`}
              className={`mx-auto mt-5`}
              width={90}
              height={90}
            />
            <div>
              <button
                onClick={mint}
                className={`mt-12 text-white w-[100px] border-[1px] hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full `}
              >
                Buy Pet
              </button>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg p-1">
            <Image
              alt="alt"
              src={`/assets/images/zeptolab start.png`}
              className={`mx-auto mt-5`}
              height={90}
              width={90}
            />
            <div>
              <button
                onClick={mint}
                className={`mt-12 text-white w-[100px] border-[1px] hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full `}
              >
                Buy Pet
              </button>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg p-1">
            <Image
              alt="alt"
              src={`/assets/images/char red.png`}
              className={`mx-auto mt-5`}
              height={90}
              width={90}
            />
            <div>
              <button
                onClick={mint}
                className={`mt-12 text-white w-[100px] border-[1px] hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full `}
              >
                Buy Pet
              </button>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg p-1">
            <Image
              alt="alt"
              src={`/assets/images/char black.png`}
              className={`mx-auto mt-5`}
              height={90}
              width={90}
            />
            <div>
              <button
                onClick={mint}
                className={`mt-12 text-white w-[100px] border-[1px] hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full `}
              >
                Buy Pet
              </button>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg p-1">
            <Image
              alt="alt"
              src={`/assets/images/char green.png`}
              className={`mx-auto mt-5`}
              height={90}
              width={90}
            />
            <div>
              <button
                onClick={mint}
                className={`mt-12 text-white w-[100px] border-[1px] hover:bg-[#62739d] border-[#3d4f7c] bg-[#3d4f7c] rounded-full `}
              >
                Buy Pet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPet;
