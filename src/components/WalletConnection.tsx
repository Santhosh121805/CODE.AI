import React, { useEffect } from 'react';
import { NeonButton } from '@/components/ui/neon-button';
import { useWalletStore, formatAddress, formatEth } from '@/store/useWalletStore';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectionProps {
  variant?: "default" | "wallet" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (accounts: string[]) => void) => void;
      removeListener: (event: string, handler: (accounts: string[]) => void) => void;
    };
  }
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({ 
  variant = "wallet", 
  size = "default" 
}) => {
  const { connectedAddress, setConnectedAddress, mockCoins } = useWalletStore();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setConnectedAddress(accounts[0]);
          }
        })
        .catch(console.error);

      // Listen for account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setConnectedAddress(accounts[0]);
        } else {
          setConnectedAddress(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [setConnectedAddress]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (accounts.length > 0) {
        setConnectedAddress(accounts[0]);
        toast({
          title: "Wallet connected!",
          description: `Connected to ${formatAddress(accounts[0])}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  if (connectedAddress) {
    return (
      <div className="flex items-center gap-3">
        <div className="coin-chip">
          {formatEth(mockCoins)} (MOCK)
        </div>
        <div className="address-chip">
          {formatAddress(connectedAddress)}
        </div>
      </div>
    );
  }

  return (
    <NeonButton variant={variant} size={size} onClick={connectWallet}>
      Connect Wallet
    </NeonButton>
  );
};