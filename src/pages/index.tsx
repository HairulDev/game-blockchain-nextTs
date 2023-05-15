import type { NextPage } from 'next';
import Navbar from './navbar';
import Tamagotchi from './tamagotchi';

const Index: NextPage = () => {
  return (
    <>
      <Tamagotchi />
      <Navbar />
    </>
  );
};

export default Index;
