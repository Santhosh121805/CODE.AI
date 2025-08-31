import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

const stats: Stat[] = [
  { label: 'Workflows', value: 200, suffix: 'k+' },
  { label: 'AI Models', value: 100, suffix: 'k+' },
  { label: 'Users', value: 110, suffix: 'k+' },
];

const AnimatedCounter: React.FC<{ end: number; suffix: string; duration?: number }> = ({ 
  end, 
  suffix, 
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span className="counter-animate">
      {count}{suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="card-neon p-8 hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-neon mb-2">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                </div>
                <div className="text-muted-foreground text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};