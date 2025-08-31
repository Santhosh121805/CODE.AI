import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle } from '@/components/ui/neon-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Trophy, Coins } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockHistory = [
  {
    id: 1,
    activity: "Fibonacci Challenge Completed",
    credits: 2.0,
    date: "2024-01-15",
    type: "challenge",
    status: "completed"
  },
  {
    id: 2,
    activity: "Code Analysis - React Optimization",
    credits: 1.5,
    date: "2024-01-14",
    type: "analysis",
    status: "completed"
  },
  {
    id: 3,
    activity: "Neural Network Training Session",
    credits: 3.0,
    date: "2024-01-13",
    type: "training",
    status: "completed"
  },
  {
    id: 4,
    activity: "Smart Contract Review",
    credits: 2.5,
    date: "2024-01-12",
    type: "review",
    status: "pending"
  },
  {
    id: 5,
    activity: "Data Pipeline Optimization",
    credits: 4.0,
    date: "2024-01-11",
    type: "optimization",
    status: "completed"
  },
  {
    id: 6,
    activity: "API Integration Challenge",
    credits: 1.8,
    date: "2024-01-10",
    type: "challenge",
    status: "completed"
  }
];

const stats = {
  totalCredits: 14.8,
  completedTasks: 5,
  pendingTasks: 1,
  averageScore: 4.2
};

export const CollectionModal: React.FC<CollectionModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredHistory = mockHistory.filter(item =>
    item.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'challenge': return <Trophy className="w-4 h-4 text-neon-cyan" />;
      case 'analysis': return <Search className="w-4 h-4 text-neon-purple" />;
      case 'training': return <Calendar className="w-4 h-4 text-neon-pink" />;
      default: return <Coins className="w-4 h-4 text-neon-cyan" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Collection - Your Activity History
          </DialogTitle>
          <p className="text-muted-foreground">
            Track your progress, credits earned, and activity history
          </p>
        </DialogHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <NeonCard>
            <NeonCardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-neon-cyan">{stats.totalCredits}</div>
              <div className="text-sm text-muted-foreground">Total Credits</div>
            </NeonCardContent>
          </NeonCard>
          
          <NeonCard>
            <NeonCardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-neon-purple">{stats.completedTasks}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </NeonCardContent>
          </NeonCard>
          
          <NeonCard>
            <NeonCardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-neon-pink">{stats.pendingTasks}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </NeonCardContent>
          </NeonCard>
          
          <NeonCard>
            <NeonCardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-neon-cyan">{stats.averageScore}</div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </NeonCardContent>
          </NeonCard>
        </div>

        {/* Search Bar */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search your activity history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Activity History Table */}
        <NeonCard className="mt-6">
          <NeonCardHeader>
            <NeonCardTitle>Activity History</NeonCardTitle>
          </NeonCardHeader>
          <NeonCardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.activity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-neon-cyan font-semibold">
                        +{item.credits} credits
                      </span>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </NeonCardContent>
        </NeonCard>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-neon-purple/20">
          <p className="text-sm text-center text-muted-foreground">
            <span className="text-neon-cyan font-semibold">Note:</span> All activity history and credits are currently mock data for demonstration purposes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};