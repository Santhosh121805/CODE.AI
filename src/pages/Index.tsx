import React from 'react';
import { motion } from 'framer-motion';
import { NeonButton } from '@/components/ui/neon-button';
import { VoxelScene } from '@/components/VoxelCharacter';
import { StatsSection } from '@/components/StatsSection';
import { ChatbotSection } from '@/components/ChatbotSection';

const Index = () => {
  const scrollToChatbot = () => {
    const chatbotSection = document.getElementById('chatbot-section');
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-cyan/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-60"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neon leading-tight">
              Explore, Collect, Build,
              <br />
              <span className="text-neon-cyan">and Trade with CODE.AI</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Discover new ways to create workflows, NFTs, and AI solutions with us.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <NeonButton 
                size="lg" 
                onClick={scrollToChatbot}
                className="text-lg px-8 py-4"
              >
                Explore Now
              </NeonButton>
            </motion.div>
          </motion.div>

          {/* 3D Voxel Characters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16"
          >
            <VoxelScene />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Chatbot Section */}
      <div id="chatbot-section">
        <ChatbotSection />
      </div>
    </div>
  );
};

export default Index;
