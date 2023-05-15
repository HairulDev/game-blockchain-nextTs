import React, { createContext, FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import BigInt from 'big-integer';
import { contractABITamagotchi, contractAddressTamagotchi } from '../utils/constants';
import { Planet, PlanetResult, ContextProps } from './Interface';

const defaultContext: ContextProps = {
  connectWallet: () => {},
  currentAccount: '',
  disconnectWallet: () => {},
  statusTamagotchi: [],
  happiness: 0,
  hunger: 0,
  lastFed: 0,
  dropFood: () => {},
  feed: () => {},
  play: () => {},
  mint: () => {},
  deletePet: () => {},
  makePetHungry: () => {},
  error: [],
  isFoodDropping: false,
  tokenPet: '',
  getPet: () => {},
  formData: {
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
    tokenId: ''
  },
  handleChange: (e: any, name: string) => {},
  sendTransaction: () => {},
  balance: '',
  isLoading: false
};

export const MyContext = createContext(defaultContext);

const createEthereumContract = (address: string, abi: any) => {
  const { ethereum }: any = window;
  if (!ethereum || !ethereum.isMetaMask) {
    throw new Error('Please install MetaMask to use this feature.');
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(address, abi, signer);
  return transactionsContract;
};

interface TamagotchiContract {
  getPet: (indexPet: number) => Promise<number>;
  feed: () => Promise<number>;
  play: () => void;
  mint: () => void;
  deletePet: () => void;
  makePetHungry: () => void;
  getStatus: () => void;
  addToBlockchain: (
    addressTo: string,
    parsedAmount: Number,
    message: string,
    keyword: string,
    uint256Num: string,
    happiness: number,
    hunger: number
  ) => void;
  getAllTransactions: () => void;
  getTransactionCount: () => void;
  wait: () => void;
}
const defaultContextTamagotchiContract: TamagotchiContract = {
  getPet: (indexPet: number) => Promise.resolve(0),
  feed: () => Promise.resolve(0),
  play: () => {},
  mint: () => {},
  deletePet: () => {},
  makePetHungry: () => {},
  getStatus: () => {},
  addToBlockchain: (
    addressTo: string,
    parsedAmount: Number,
    message: string,
    keyword: string,
    uint256Num: string,
    happiness: number,
    hunger: number
  ) => {},
  getAllTransactions: () => {},
  getTransactionCount: () => {},
  wait: () => {}
};

const MyContextProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailPlanet, setDetailPlanet] = useState<Planet | null>(null);
  const [formData, setFormData] = useState<PlanetResult>(defaultContext.formData);
  const [currentAccount, setCurrentAccount] = useState<string>('');

  const [accountCrypto, setAccountCrypto] = useState<string>(() => {
    const storedValue =
      typeof window !== 'undefined' ? window.localStorage.getItem('accountCrypto') : null;
    return storedValue !== null ? storedValue : '';
  });

  const [transactionCount, setTransactionCount] = useState<string>(() => {
    const storedCount =
      typeof window !== 'undefined' ? window.localStorage.getItem('transactionCount') : null;
    return storedCount !== null ? storedCount : '';
  });
  const [transactions, setTransactions] = useState<[]>([]);
  const [trxHas, setTrxHas] = useState<string>('');

  const [showTransaction, setshowTransaction] = useState<boolean>(false);

  const [statusTamagotchi, setStatusTamagotchi] = useState<[]>([]);
  const [happiness, setHappiness] = useState<number>(0);
  const [hunger, setHunger] = useState<number>(0);
  const [lastFed, setLastFed] = useState<number>(0);
  const [tamagotchiContract, setTamagotchiContract] = useState<TamagotchiContract>(
    defaultContextTamagotchiContract
  );
  // const [tamagotchiContract, setTamagotchiContract] = useState<TamagotchiContract>();

  const [showPet, setShowPet] = useState<boolean>(false);
  const [isFoodDropping, setIsFoodDropping] = useState<boolean>(false);
  const [tokenPet, setTokenPet] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<string>('');

  const [error, setError] = useState<[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });
      // window.location.reload();
      if (accounts) setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      // throw new Error("No ethereum object");
    }
  };

  const disconnectWallet = async () => {
    try {
      const { ethereum }: any = window;
      await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
      window.location.reload();
      setCurrentAccount('');
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      const { ethereum }: any = window;
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // getAllPets();
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getContractTamagotchi = async () => {
    try {
      const tContract: any = createEthereumContract(
        contractAddressTamagotchi,
        contractABITamagotchi
      );
      setTamagotchiContract(tContract);
      getStatusTamagotchi(tContract);
    } catch (error) {
      console.log('error getContractTamagotchi', error);
    }
  };

  const getStatusTamagotchi = async (tContract: any) => {
    try {
      const status = await tContract.getStatus();
      console.log('getStatusTamagotchi ', status);
      setTamagotchiStatus(status);
    } catch (error) {
      console.log('error getStatusTamagotchi', error);
    }
  };

  const setTamagotchiStatus = (status: any) => {
    setStatusTamagotchi(status.toString());
    setHappiness(Number(status[0]));
    setHunger(Number(status[1]));
    setLastFed(Number(status[2]));
  };

  const getPet = async () => {
    try {
      const petIndex: number = 0;
      const tokenId = await tamagotchiContract.getPet(petIndex);
      const tokenPet: string = tokenId.toString();
      setTokenPet(tokenPet);
    } catch (error) {
      console.log('error getPet==>>', error);
    }
  };

  const dropFood = () => {
    setError([]);
    setIsFoodDropping(true);
  };

  const feed = async () => {
    try {
      setIsLoading(true);
      const feedTx: any = await tamagotchiContract.feed();
      await feedTx.wait();
      const status = await tamagotchiContract.getStatus();
      setTamagotchiStatus(status);
      setIsFoodDropping(false);
      setError([]);
      setIsLoading(false);
    } catch (error: any) {
      setError(
        error?.data?.message.match('Pet is not hungry') ||
          error?.data?.message.match('Pet is full') ||
          error?.data?.message.match("It's not time to feed your pet yet")
      );
      setIsFoodDropping(false);
    }
  };

  const play = async () => {
    try {
      const playTx: any = await tamagotchiContract.play();
      await playTx.wait();
      const status = await tamagotchiContract.getStatus();
      setTamagotchiStatus(status);
      setIsFoodDropping(false);
      setError([]);
    } catch (error: any) {
      setError(
        error?.data?.message.match('Pet is not happy') ||
          error?.data?.message.match('Pet is hungry')
      );
    }
  };

  const makePetHungry = async () => {
    try {
      const makePetHungryTx: any = await tamagotchiContract.makePetHungry();
      await makePetHungryTx.wait();
      const status = await tamagotchiContract.getStatus();
      setTamagotchiStatus(status);
    } catch (error) {
      console.log('error makePetHungry', error);
    }
  };

  const mint = async () => {
    try {
      const mintTx: any = await tamagotchiContract.mint();
      await mintTx.wait();
      const status = await tamagotchiContract.getStatus();
      setTamagotchiStatus(status);
      setIsFoodDropping(false);
      setError([]);
      // window.location.reload();
    } catch (error: any) {
      setError(error?.data?.message.match('You already have a pet'));
    }
  };

  const deletePet = async () => {
    try {
      const deletePetTx: any = await tamagotchiContract.deletePet();
      await deletePetTx.wait();
      const status = await tamagotchiContract.getStatus();
      setTamagotchiStatus(status);
      setTokenPet('');
      setError([]);
      // window.location.reload();
    } catch (error: any) {
      setError(error?.data?.message.match("You don't have a pet"));
    }
  };

  const getEthBalance = async (address: string, provider: any) => {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  };

  const getDataAccount = async () => {
    const { ethereum }: any = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const addressSigner = await signer.getAddress();
    const getEth = await getEthBalance(addressSigner, provider);
    setEthBalance(getEth);
    const balance = Number(getEth);
    setBalance(balance.toFixed(4));
  };

  const handleChange = (e: any, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const sendTransaction = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const { addressTo, amount, keyword, message, tokenId }: any = formData;

        const parsedAmount: any = ethers.utils.parseEther(amount);
        console.log('parsedAmount', parsedAmount);
        return;
        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: '0x5208',
              value: parsedAmount._hex
            }
          ]
        });

        const bigIntNum = BigInt(tokenId);
        const uint256Num = '0x' + bigIntNum.toString(16).padStart(64, '0');

        const transactionHash: any = await tamagotchiContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword,
          uint256Num,
          happiness,
          hunger
          // tokenId.toString()
        );
        await transactionHash.wait();

        // Listen for the event
        // tamagotchiContract.on(
        //   'Transaction',
        //   (sender, receiver, amount, message, timestamp, keyword, tokenId):any => {
        //     setTransactions((transactions) => [
        //       ...transactions,
        //       {
        //         sender,
        //         receiver,
        //         amount,
        //         message,
        //         timestamp,
        //         keyword,
        //         tokenId
        //       }
        //     ]);
        //   }
        // );

        setIsLoading(true);
        setTrxHas(transactionHash.hash);
        await transactionHash.wait();
        setIsLoading(false);
        const transactionsCount: any = await tamagotchiContract.getTransactionCount();
        setTransactionCount(transactionsCount.toNumber());
        setShowPet(false);
        window.location.reload();
      } else {
        console.log('No ethereum object sendTransaction');
      }
    } catch (error) {
      console.log('error sendTransaction==>', error);
      throw new Error('No ethereum object sendTransaction');
    }
  };

  const getAllTransactions = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const availableTransactions: any = await tamagotchiContract.getAllTransactions();
        const structuredTransactions = availableTransactions.map((transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18
        }));
        setTransactions(structuredTransactions);
      } else {
        console.log('Ethereum is not present');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContractTamagotchi();
    checkIfWalletIsConnect();
    getPet();
    getDataAccount();
  }, []);

  useEffect(() => {
    getPet();
  }, [happiness, hunger]);

  const contextValue: ContextProps = {
    connectWallet,
    currentAccount,
    disconnectWallet,
    statusTamagotchi,
    happiness,
    hunger,
    lastFed,
    dropFood,
    feed,
    play,
    mint,
    deletePet,
    makePetHungry,
    error,
    isFoodDropping,
    tokenPet,
    getPet,
    formData,
    handleChange,
    sendTransaction,
    balance,
    isLoading
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
