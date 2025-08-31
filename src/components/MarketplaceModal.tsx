import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle } from '@/components/ui/neon-card';
import { NeonButton } from '@/components/ui/neon-button';
import { Badge } from '@/components/ui/badge';

interface MarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockChallenges = [
  {
    id: 1,
    title: "Neural Network Optimizer",
    description: "Build an AI model that optimizes neural network hyperparameters",
    points: 150,
    difficulty: "Advanced",
    category: "AI/ML",
    participants: 42,
    timeLeft: "3 days",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Smart Contract Auditor",
    description: "Create a tool that automatically audits smart contracts for vulnerabilities",
    points: 120,
    difficulty: "Expert",
    category: "Blockchain",
    participants: 28,
    timeLeft: "5 days",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Real-time Data Visualizer",
    description: "Build a dashboard that visualizes real-time cryptocurrency market data",
    points: 80,
    difficulty: "Intermediate",
    category: "Data Science",
    participants: 67,
    timeLeft: "1 week",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Voice Assistant API",
    description: "Develop a voice-controlled API for blockchain transactions",
    points: 200,
    difficulty: "Expert",
    category: "AI/Voice",
    participants: 15,
    timeLeft: "2 weeks",
    status: "upcoming"
  },
  {
    id: 5,
    title: "DeFi Yield Calculator",
    description: "Create a calculator that optimizes DeFi yield farming strategies",
    points: 95,
    difficulty: "Intermediate",
    category: "DeFi",
    participants: 89,
    timeLeft: "10 days",
    status: "upcoming"
  }
];

export const MarketplaceModal: React.FC<MarketplaceModalProps> = ({ isOpen, onClose }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30';
      case 'Intermediate': return 'bg-neon-purple/20 text-neon-purple border-neon-purple/30';
      case 'Advanced': return 'bg-neon-pink/20 text-neon-pink border-neon-pink/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Marketplace - Upcoming Challenges
          </DialogTitle>
          <p className="text-muted-foreground">
            Discover exciting challenges and earn crypto points by solving real-world problems
          </p>
        </DialogHeader>

        <div className="grid gap-4 mt-6">
          {mockChallenges.map((challenge) => (
            <NeonCard key={challenge.id} className="relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                  {challenge.points} pts
                </Badge>
              </div>
              
              <NeonCardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <NeonCardTitle className="text-lg">{challenge.title}</NeonCardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </NeonCardHeader>
              
              <NeonCardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {challenge.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {challenge.participants} participants
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-neon-cyan">
                      {challenge.timeLeft} left
                    </span>
                    <NeonButton size="sm" variant="outline">
                      Join Challenge
                    </NeonButton>
                  </div>
                </div>
              </NeonCardContent>
            </NeonCard>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-neon-purple/20">
          <p className="text-sm text-center text-muted-foreground">
            <span className="text-neon-cyan font-semibold">Note:</span> All challenges and rewards are currently mock implementations for demonstration purposes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};