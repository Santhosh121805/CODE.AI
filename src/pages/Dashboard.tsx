import React from 'react';
import { motion } from 'framer-motion';
import { useWalletStore, formatPoints, formatEth } from '@/store/useWalletStore';
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle } from '@/components/ui/neon-card';
import { NeonButton } from '@/components/ui/neon-button';
import { WalletConnection } from '@/components/WalletConnection';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { 
    connectedAddress, 
    mockCoins, 
    cryptoPoints, 
    challenges 
  } = useWalletStore();
  const navigate = useNavigate();

  if (!connectedAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NeonCard className="max-w-md mx-auto text-center">
          <NeonCardHeader>
            <NeonCardTitle>Connect Your Wallet</NeonCardTitle>
          </NeonCardHeader>
          <NeonCardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please connect your wallet to access the dashboard.
            </p>
            <WalletConnection />
          </NeonCardContent>
        </NeonCard>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Solve Challenge: Fibonacci',
      description: 'Complete the Fibonacci series challenge',
      action: () => navigate('/profile#challenges'),
      disabled: challenges.fibonacci.solved,
    },
    {
      title: 'Claim Reward',
      description: 'Claim your earned crypto points',
      action: () => navigate('/profile#claim'),
      disabled: cryptoPoints === 0,
    },
  ];

  const activityFeed = [
    { action: 'Connected wallet', timestamp: 'Just now', type: 'success' },
    { action: 'Viewed Fibonacci Challenge', timestamp: '5 minutes ago', type: 'info' },
    ...(challenges.fibonacci.solved ? [
      { action: 'Completed Fibonacci Challenge', timestamp: challenges.fibonacci.lastSolvedAt, type: 'success' }
    ] : []),
  ];

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
                Welcome, CODE.AI Builder
              </h1>
              <div className="flex items-center gap-4">
                <WalletConnection />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle className="text-neon-cyan">Points Balance</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="text-2xl font-bold text-neon">
                  ${formatPoints(cryptoPoints)} crypto points
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Available to claim
                </div>
              </NeonCardContent>
            </NeonCard>

            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle className="text-neon-purple">Models Created</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="text-2xl font-bold text-neon">0</div>
                <div className="text-sm text-muted-foreground mt-1">
                  AI models deployed
                </div>
              </NeonCardContent>
            </NeonCard>

            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle className="text-neon-pink">Workflows Built</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent>
                <div className="text-2xl font-bold text-neon">0</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Automation workflows
                </div>
              </NeonCardContent>
            </NeonCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle>Quick Actions</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-neon-purple/20 bg-background/50"
                  >
                    <div>
                      <div className="font-medium text-foreground">{action.title}</div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                    <NeonButton
                      size="sm"
                      onClick={action.action}
                      disabled={action.disabled}
                      variant={action.disabled ? "ghost" : "default"}
                    >
                      {action.disabled ? 'Completed' : 'Start'}
                    </NeonButton>
                  </div>
                ))}
              </NeonCardContent>
            </NeonCard>

            {/* Activity Feed */}
            <NeonCard>
              <NeonCardHeader>
                <NeonCardTitle>Recent Activity</NeonCardTitle>
              </NeonCardHeader>
              <NeonCardContent className="space-y-3">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-neon-cyan' : 'bg-neon-purple'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">
                        {typeof activity.timestamp === 'string' && activity.timestamp.includes('T') 
                          ? new Date(activity.timestamp).toLocaleString()
                          : activity.timestamp
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </NeonCardContent>
            </NeonCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
};