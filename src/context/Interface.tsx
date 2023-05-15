export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
}

export interface PlanetResult {
  addressTo: string | null;
  amount: string | null;
  keyword: string | null;
  message: string | null;
  tokenId: string | null;
  // results: Planet[];
}

export interface ContextProps {
  connectWallet: () => void;
  currentAccount: string;
  disconnectWallet: () => void;
  statusTamagotchi: [];
  happiness: number;
  hunger: number;
  lastFed: number;
  dropFood: () => void;
  feed: () => void;
  play: () => void;
  mint: () => void;
  deletePet: () => void;
  makePetHungry: () => void;
  error: [];
  isFoodDropping: boolean;
  tokenPet: string;
  getPet: () => void;
  formData: PlanetResult;
  handleChange: (e: any, name: string) => void;
  sendTransaction: () => void;
  balance: string;
  isLoading: boolean;
}
