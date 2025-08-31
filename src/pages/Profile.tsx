import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWalletStore, formatPoints, generateMockTxHash } from '@/store/useWalletStore';
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle } from '@/components/ui/neon-card';
import { NeonButton } from '@/components/ui/neon-button';
import { WalletConnection } from '@/components/WalletConnection';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const Profile: React.FC = () => {
  const { 
    connectedAddress, 
    cryptoPoints, 
    challenges, 
    transactions,
    solveFibonacci, 
    claimReward,
    addTransaction 
  } = useWalletStore();
  
  const [codeInput, setCodeInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [testPassed, setTestPassed] = useState(false);
  const { toast } = useToast();

  if (!connectedAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NeonCard className="max-w-md mx-auto text-center">
          <NeonCardHeader>
            <NeonCardTitle>Connect Your Wallet</NeonCardTitle>
          </NeonCardHeader>
          <NeonCardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please connect your wallet to access your profile.
            </p>
            <WalletConnection />
          </NeonCardContent>
        </NeonCard>
      </div>
    );
  }

  const handleCodeSubmit = async () => {
    if (!codeInput.trim()) {
      toast({
        title: "No code provided",
        description: "Please paste your code before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate code validation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple validation - check if code contains fibonacci-like logic
    const hasLoop = /for|while/.test(codeInput);
    const hasSequence = /0.*1|fibonacci/i.test(codeInput);
    
    if (hasLoop && hasSequence) {
      setTestPassed(true);
      solveFibonacci();
      
      toast({
        title: "Test Passed! ✅",
        description: "Your code successfully generates the sequence from 0 to 10. $2 claimed!",
      });
    } else {
      toast({
        title: "Test Failed ❌",
        description: "Your code doesn't properly generate the sequence from 0 to 10.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const handleClaimReward = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to claim rewards.",
        variant: "destructive",
      });
      return;
    }

    setIsClaiming(true);
    
    try {
      // Only trigger signature, no real transaction
      await window.ethereum.request({
        method: 'personal_sign',
        params: [
          `Claiming $${formatPoints(cryptoPoints)} crypto points for Fibonacci challenge at ${new Date().toISOString()}`,
          connectedAddress
        ]
      });

      const mockTxHash = generateMockTxHash();
      
      addTransaction({
        type: 'claim',
        amount: cryptoPoints,
        timestamp: Date.now(),
        txHash: mockTxHash,
        status: 'completed',
      });
      
      claimReward(cryptoPoints);
      
      toast({
        title: "Reward Claimed!",
        description: `Successfully claimed ${formatPoints(cryptoPoints)} points. TX: ${mockTxHash.slice(0, 10)}...`,
      });
      
    } catch (error: any) {
      if (error.code === 4001) {
        toast({
          title: "Claim cancelled",
          description: "No points moved.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Claim failed",
          description: error.message || "Failed to claim reward",
          variant: "destructive",
        });
      }
    }
    
    setIsClaiming(false);
  };

  const fibonacciResults = "0, 1, 1, 2, 3, 5, 8, 13, 21, 34";

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neon mb-2">
                Profile
              </h1>
              <WalletConnection />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overview */}
            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle>Overview</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Username</div>
                    <div className="font-medium">Builder_001</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Reputation</div>
                    <div className="font-medium text-neon-cyan">4.8 ⭐</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Specialization</div>
                    <div className="font-medium">AI Workflows</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Points Balance</div>
                    <div className="font-medium text-neon">${formatPoints(cryptoPoints)}</div>
                  </div>
                </div>
              </NeonCardContent>
            </NeonCard>

            {/* Problems Solved */}
            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle>Problems Solved</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                    <div>
                      <div className="font-medium">Fibonacci Series</div>
                      <div className="text-sm text-muted-foreground">
                        Attempts: {challenges.fibonacci.attempts} | 
                        Status: <span className={challenges.fibonacci.solved ? 'text-neon-cyan' : 'text-muted-foreground'}>
                          {challenges.fibonacci.solved ? 'Solved' : 'Not Solved'}
                        </span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      challenges.fibonacci.solved ? 'bg-neon-cyan' : 'bg-muted'
                    }`}></div>
                  </div>
                </div>
              </NeonCardContent>
            </NeonCard>
          </div>

          {/* Challenges Section */}
          <div id="challenges">
            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle>Fibonacci Challenge</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-neon-cyan mb-2">Challenge Description</h4>
                  <p className="text-muted-foreground">
                    Write code that generates a sequence from 0 to 10. Your code should demonstrate proper logic 
                    for generating sequential numbers starting from 0 and ending at 10.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Paste your code here:</label>
                    <Textarea
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="// Paste your code that generates sequence from 0 to 10
for (let i = 0; i <= 10; i++) {
  console.log(i);
}"
                      className="min-h-[120px] font-mono text-sm"
                      disabled={challenges.fibonacci.solved}
                    />
                  </div>

                  <NeonButton
                    onClick={handleCodeSubmit}
                    disabled={challenges.fibonacci.solved || isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? 'Running Tests...' : challenges.fibonacci.solved ? 'Completed ✅' : 'Run & Submit'}
                  </NeonButton>

                  {testPassed && challenges.fibonacci.solved && (
                    <div className="mt-4 p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
                      <div className="text-sm font-medium text-neon-cyan mb-2">Test Passed! ✅</div>
                      <div className="font-mono text-sm text-neon">$2 Claimed - Ready to transfer to wallet</div>
                    </div>
                  )}
                </div>
              </NeonCardContent>
            </NeonCard>
          </div>

          {/* Claim Section */}
          {challenges.fibonacci.solved && (
            <div id="claim">
              <NeonCard>
                <NeonCardHeader>
                  <NeonCardTitle>Claim Rewards</NeonCardTitle>
                </NeonCardHeader>
                <NeonCardContent className="space-y-4">
                  <div className="text-center py-6">
                    <div className="text-2xl font-bold text-neon mb-2">
                      You earned ${formatPoints(cryptoPoints)} crypto points!
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Complete the claim process by signing with your wallet (no real funds transferred)
                    </p>
                    <NeonButton
                      onClick={handleClaimReward}
                      disabled={cryptoPoints === 0 || isClaiming}
                      className="w-full md:w-auto"
                    >
                      {isClaiming ? 'Claiming...' : 'Claim to Wallet'}
                    </NeonButton>
                  </div>
                </NeonCardContent>
              </NeonCard>
            </div>
          )}

          {/* Claim History */}
          {transactions.length > 0 && (
            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle>Claim History</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                      <div>
                        <div className="font-medium">${formatPoints(tx.amount)} claimed</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleString()}
                        </div>
                        <div className="text-xs font-mono text-neon-cyan">
                          TX: {tx.txHash.slice(0, 20)}...
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-xs">
                        {tx.status}
                      </div>
                    </div>
                  ))}
                </div>
              </NeonCardContent>
            </NeonCard>
          )}
        </motion.div>
      </div>
    </div>
  );
};