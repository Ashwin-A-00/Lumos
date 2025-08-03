import { motion } from 'framer-motion';
import { Flame, Coffee } from 'lucide-react';
import { useEffect } from 'react';

interface StudyEnvironmentProps {
  environment: 'library' | 'cafe';
  onEnvironmentChange: (env: 'library' | 'cafe') => void;
}

export const StudyEnvironment = ({ environment, onEnvironmentChange }: StudyEnvironmentProps) => {
  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (environment === 'cafe') {
      root.classList.add('cafe-theme');
    } else {
      root.classList.remove('cafe-theme');
    }
    
    return () => {
      root.classList.remove('cafe-theme');
    };
  }, [environment]);

  const environments = {
    library: {
      name: 'Cozy Library',
      icon: Flame,
      bg: '/src/assets/library-bg.jpg',
      description: 'Warm fireplace, gentle rain sounds'
    },
    cafe: {
      name: 'Café Glow', 
      icon: Coffee,
      bg: '/src/assets/cafe-bg.jpg',
      description: 'Jazz music, coffee aromas'
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Parallax Effect and Theme Transition */}
      <motion.div
        key={environment}
        initial={{ scale: 1.1, opacity: 0, rotateY: 10 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.95, opacity: 0, rotateY: -10 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${environments[environment].bg})`,
        }}
      />
      
      {/* Ambient Overlay with Theme Transition */}
      <motion.div 
        key={`overlay-${environment}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 ambient-bg"
      />
      
      {/* Smooth Theme Transition Overlay */}
      <motion.div
        key={`theme-${environment}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: environment === 'cafe' 
            ? 'radial-gradient(circle at 50% 50%, rgba(244, 194, 125, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255, 183, 77, 0.08) 0%, transparent 70%)'
        }}
      />
      
      {/* Environment Switcher */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 right-6 z-10"
      >
        <motion.div 
          className="flex gap-2 p-2 glass-panel rounded-xl glow-accent"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {Object.entries(environments).map(([key, env]) => {
            const Icon = env.icon;
            const isActive = environment === key;
            
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEnvironmentChange(key as 'library' | 'cafe')}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-700 ease-out
                  ${isActive 
                    ? 'bg-primary text-primary-foreground glow-primary shadow-lg transform' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-md'
                  }
                `}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Icon size={16} />
                <span className="text-sm">{env.name}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

    </div>
  );
};