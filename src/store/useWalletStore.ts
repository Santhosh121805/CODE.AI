import { create } from 'zustand';

export interface Challenge {
  solved: boolean;
  attempts: number;
  lastSolvedAt: string | null;
}

export interface Transaction {
  id: string;
  type: 'claim';
  amount: number;
  timestamp: number;
  txHash: string;
  status: 'completed';
}

interface WalletState {
  connectedAddress: string | null;
  mockCoins: number;
  cryptoPoints: number;
  challenges: {
    fibonacci: Challenge;
  };
  transactions: Transaction[];
  
  // Actions
  setConnectedAddress: (address: string | null) => void;
  solveFibonacci: () => void;
  claimReward: (amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  connectedAddress: null,
  mockCoins: 2.500,
  cryptoPoints: 0.00,
  challenges: {
    fibonacci: {
      solved: false,
      attempts: 0,
      lastSolvedAt: null,
    },
  },
  transactions: [],

  setConnectedAddress: (address) => set({ connectedAddress: address }),

  solveFibonacci: () => set((state) => ({
    challenges: {
      ...state.challenges,
      fibonacci: {
        ...state.challenges.fibonacci,
        solved: true,
        attempts: state.challenges.fibonacci.attempts + 1,
        lastSolvedAt: new Date().toISOString(),
      },
    },
    cryptoPoints: state.cryptoPoints + 2.00,
  })),

  claimReward: (amount) => set((state) => ({
    mockCoins: state.mockCoins + amount,
    cryptoPoints: Math.max(0, state.cryptoPoints - amount),
  })),

  addTransaction: (transaction) => set((state) => ({
    transactions: [
      {
        ...transaction,
        id: Date.now().toString(),
      },
      ...state.transactions,
    ],
  })),
}));

// Utility functions
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const generateMockTxHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

export const formatPoints = (points: number): string => {
  return points.toFixed(2);
};

export const formatEth = (amount: number): string => {
  return `Ξ ${amount.toFixed(3)}`;
};