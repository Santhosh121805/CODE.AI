import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletConnection } from './WalletConnection';
import { NeonButton } from './ui/neon-button';
import { MarketplaceModal } from './MarketplaceModal';
import { CollectionModal } from './CollectionModal';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '#', isModal: true },
    { name: 'Collection', path: '#', isModal: true },
    { name: 'Profile', path: '/profile' },
    { name: 'Pages', path: '/pages' },
  ];

  const handleModalLink = (name: string) => {
    if (name === 'Marketplace') {
      setIsMarketplaceOpen(true);
    } else if (name === 'Collection') {
      setIsCollectionOpen(true);
    }
  };

  return (
    <header className="relative z-50 w-full border-b border-neon-purple/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
            CODE.AI
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.isModal ? (
              <button
                key={item.name}
                onClick={() => handleModalLink(item.name)}
                className="text-foreground/80 hover:text-neon-cyan transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`text-foreground/80 hover:text-neon-cyan transition-colors relative group ${
                  location.pathname === item.path ? 'text-neon-cyan' : ''
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          ))}
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center">
          <WalletConnection />
        </div>

        {/* Mobile menu button - placeholder */}
        <div className="md:hidden">
          <NeonButton variant="ghost" size="icon">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </NeonButton>
        </div>
      </div>

      {/* Modals */}
      <MarketplaceModal isOpen={isMarketplaceOpen} onClose={() => setIsMarketplaceOpen(false)} />
      <CollectionModal isOpen={isCollectionOpen} onClose={() => setIsCollectionOpen(false)} />
    </header>
  );
};