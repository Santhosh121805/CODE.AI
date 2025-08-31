import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from './ui/neon-button';
import { NeonCard, NeonCardContent, NeonCardHeader, NeonCardTitle } from './ui/neon-card';
import { Textarea } from './ui/textarea';

interface CodeExplanation {
  explanation: string;
  workflowDiagram: string;
  neuralDiagram?: string;
  results: string;
}

export const ChatbotSection: React.FC = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplainCode = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const hasMLKeywords = /machine learning|neural|ai|model|training|tensorflow|pytorch|sklearn/i.test(code);

    setExplanation({
      explanation: `This code appears to be a ${hasMLKeywords ? 'machine learning' : 'general programming'} implementation. The code structure follows standard programming patterns with proper variable declarations and control flow. ${hasMLKeywords ? 'It includes AI/ML specific operations for data processing and model training.' : 'It demonstrates algorithmic problem-solving techniques.'}`,
      workflowDiagram: hasMLKeywords ? 'ML Workflow' : 'Standard Workflow',
      neuralDiagram: hasMLKeywords ? 'Neural Network Architecture' : undefined,
      results: 'First 10 Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34'
    });
    
    setIsLoading(false);
  };

  const WorkflowDiagram: React.FC<{ type: string }> = ({ type }) => (
    <div className="w-full h-48 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-lg border border-neon-purple/30 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        {['Input', 'Process', 'Output'].map((step, index) => (
          <React.Fragment key={step}>
            <div className="px-4 py-2 bg-neon-purple/30 rounded-lg border border-neon-purple/50 text-sm font-medium">
              {step}
            </div>
            {index < 2 && (
              <div className="w-8 h-0.5 bg-neon-cyan"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const NeuralDiagram: React.FC = () => (
    <div className="w-full h-48 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-lg border border-neon-pink/30 flex items-center justify-center">
      <div className="flex items-center space-x-8">
        {[3, 4, 2].map((nodes, layerIndex) => (
          <React.Fragment key={layerIndex}>
            <div className="flex flex-col space-y-2">
              {Array.from({ length: nodes }).map((_, nodeIndex) => (
                <div key={nodeIndex} className="w-3 h-3 bg-neon-pink rounded-full animate-pulse"></div>
              ))}
            </div>
            {layerIndex < 2 && (
              <div className="flex flex-col space-y-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-6 h-0.5 bg-neon-cyan/50"></div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neon mb-4">
            AI Code Assistant
          </h2>
          <p className="text-muted-foreground text-lg">
            Paste your code and get instant explanations, workflow diagrams, and neural network visualizations
          </p>
        </motion.div>

        <NeonCard className="mb-8">
          <NeonCardHeader>
            <NeonCardTitle>Code Input</NeonCardTitle>
          </NeonCardHeader>
          <NeonCardContent className="space-y-4">
            <Textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-32 bg-background/50 border-neon-purple/30 focus:border-neon-purple/60"
            />
            <NeonButton 
              onClick={handleExplainCode}
              disabled={!code.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? 'Analyzing...' : 'Explain Code'}
            </NeonButton>
          </NeonCardContent>
        </NeonCard>

        <AnimatePresence>
          {explanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Explanation */}
              <NeonCard>
                <NeonCardHeader>
                  <NeonCardTitle className="text-neon-cyan">Plain Language Explanation</NeonCardTitle>
                </NeonCardHeader>
                <NeonCardContent>
                  <p className="text-muted-foreground leading-relaxed">{explanation.explanation}</p>
                </NeonCardContent>
              </NeonCard>

              {/* Workflow Diagram */}
              <NeonCard>
                <NeonCardHeader>
                  <NeonCardTitle className="text-neon-purple">Workflow Diagram</NeonCardTitle>
                </NeonCardHeader>
                <NeonCardContent>
                  <WorkflowDiagram type={explanation.workflowDiagram} />
                </NeonCardContent>
              </NeonCard>

              {/* Neural Network Diagram (if ML code) */}
              {explanation.neuralDiagram && (
                <NeonCard>
                  <NeonCardHeader>
                    <NeonCardTitle className="text-neon-pink">Neural Network Architecture</NeonCardTitle>
                  </NeonCardHeader>
                  <NeonCardContent>
                    <NeuralDiagram />
                  </NeonCardContent>
                </NeonCard>
              )}

              {/* Results */}
              <NeonCard>
                <NeonCardHeader>
                  <NeonCardTitle className="text-neon-cyan">Execution Results</NeonCardTitle>
                </NeonCardHeader>
                <NeonCardContent>
                  <div className="bg-background/50 rounded-lg p-4 font-mono text-sm border border-neon-cyan/30">
                    {explanation.results}
                  </div>
                </NeonCardContent>
              </NeonCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};