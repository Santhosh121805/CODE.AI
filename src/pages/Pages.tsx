import React from 'react';
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle } from '@/components/ui/neon-card';
import { NeonButton } from '@/components/ui/neon-button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';

const premiumFeatures = [
  {
    id: 1,
    title: "AI Code Assistant Pro",
    description: "Advanced AI-powered code generation and optimization with real-time suggestions",
    price: "$7.99",
    originalPrice: "$15.99",
    features: [
      "Advanced code completion",
      "Real-time bug detection",
      "Performance optimization tips",
      "Multi-language support"
    ],
    badge: "Most Popular",
    badgeColor: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30",
    icon: <Zap className="w-6 h-6 text-neon-cyan" />
  },
  {
    id: 2,
    title: "Smart Contract Analyzer",
    description: "Professional-grade smart contract analysis and security auditing tools",
    price: "$9.99",
    originalPrice: "$19.99",
    features: [
      "Vulnerability scanning",
      "Gas optimization analysis",
      "Security best practices",
      "Automated testing suite"
    ],
    badge: "Professional",
    badgeColor: "bg-neon-purple/20 text-neon-purple border-neon-purple/30",
    icon: <Crown className="w-6 h-6 text-neon-purple" />
  },
  {
    id: 3,
    title: "Neural Network Designer",
    description: "Visual neural network design tool with drag-and-drop architecture builder",
    price: "$6.99",
    originalPrice: "$12.99",
    features: [
      "Visual network builder",
      "Pre-trained model library",
      "Training progress tracking",
      "Model performance analytics"
    ],
    badge: "New",
    badgeColor: "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
    icon: <Sparkles className="w-6 h-6 text-neon-pink" />
  },
  {
    id: 4,
    title: "Data Pipeline Optimizer",
    description: "Automated data pipeline optimization and monitoring for better performance",
    price: "$8.50",
    originalPrice: "$16.99",
    features: [
      "Pipeline visualization",
      "Performance monitoring",
      "Automated optimization",
      "Real-time alerts"
    ],
    badge: "Enterprise",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: <Star className="w-6 h-6 text-yellow-400" />
  }
];

const Pages: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
              Premium Features Under $10
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock powerful AI tools and advanced features at incredible prices. Limited time offers available now!
            </p>
          </div>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {premiumFeatures.map((feature) => (
              <NeonCard key={feature.id} className="relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={feature.badgeColor}>
                    {feature.badge}
                  </Badge>
                </div>

                <NeonCardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-background/50 border border-neon-purple/20">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <NeonCardTitle className="text-xl mb-2">{feature.title}</NeonCardTitle>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </NeonCardHeader>

                <NeonCardContent>
                  {/* Pricing */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-neon-cyan">{feature.price}</span>
                    <span className="text-lg text-muted-foreground line-through">{feature.originalPrice}</span>
                    <Badge variant="outline" className="text-green-400 border-green-500/30">
                      50% OFF
                    </Badge>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <NeonButton className="w-full" size="lg">
                    Get Premium Access
                  </NeonButton>
                </NeonCardContent>
              </NeonCard>
            ))}
          </div>

          {/* Special Offer Banner */}
          <NeonCard className="text-center py-8 bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 border-neon-purple/30">
            <NeonCardContent>
              <h3 className="text-2xl font-bold text-neon-cyan mb-2">
                🎉 Limited Time Bundle Offer
              </h3>
              <p className="text-muted-foreground mb-4">
                Get all premium features for just <span className="text-neon-pink font-bold">$24.99</span> (Save $35!)
              </p>
              <NeonButton size="lg" className="bg-gradient-to-r from-neon-purple to-neon-cyan">
                Claim Bundle Deal
              </NeonButton>
            </NeonCardContent>
          </NeonCard>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-neon-purple/20">
            <p className="text-sm text-center text-muted-foreground">
              <span className="text-neon-cyan font-semibold">Note:</span> All premium features and pricing are currently mock implementations for demonstration purposes. No actual purchases will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;