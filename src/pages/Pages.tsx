import React from 'react';
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle } from '@/components/ui/neon-card';

const Pages: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <NeonCard>
            <NeonCardHeader>
              <NeonCardTitle>Pages Section</NeonCardTitle>
            </NeonCardHeader>
            <NeonCardContent>
              <p className="text-muted-foreground">
                This is a placeholder page. Additional features and pages will be implemented here in the future.
              </p>
            </NeonCardContent>
          </NeonCard>
        </div>
      </div>
    </div>
  );
};

export default Pages;