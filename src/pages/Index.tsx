import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudyEnvironment } from '@/components/StudyEnvironment';
import { FocusTimer } from '@/components/FocusTimer';
import { AvatarSystem } from '@/components/AvatarSystem';
import { AmbientSoundPanel } from '@/components/AmbientSoundPanel';
import { ParticleEffect } from '@/components/ParticleEffect';

const Index = () => {
  const [environment, setEnvironment] = useState<'library' | 'cafe'>('library');
  const [userStatus, setUserStatus] = useState<'focused' | 'break' | 'idle'>('idle');
  const [selectedAvatar, setSelectedAvatar] = useState('🧑‍💻');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="w-20 h-20 mx-auto mb-6 glass-panel rounded-2xl flex items-center justify-center glow-accent"
              >
                <motion.span
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="text-4xl"
                >
                  ✨
                </motion.span>
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-playfair text-4xl font-bold text-foreground mb-2"
              >
                Lumos
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-muted-foreground text-lg"
              >
                Light up your study flow
              </motion.p>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-8 flex justify-center"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse mx-2" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Environment */}
      <StudyEnvironment 
        environment={environment}
        onEnvironmentChange={setEnvironment}
      />
      
      {/* Particle Effects */}
      <ParticleEffect environment={environment} count={environment === 'library' ? 20 : 12} />
      
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: isLoading ? 2.8 : 0.1, duration: 0.8 }}
        className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10"
      >
        <div className="flex items-center gap-2 lg:gap-3">
          <motion.div
            className="w-10 h-10 lg:w-12 lg:h-12 glass-panel rounded-xl flex items-center justify-center glow-accent"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl lg:text-2xl">✨</span>
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="font-playfair text-xl lg:text-2xl font-bold text-foreground">Lumos</h1>
            <p className="text-xs lg:text-sm text-muted-foreground">Light up your study flow</p>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Responsive Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isLoading ? 3.0 : 0.3, duration: 1 }}
        className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-12 gap-4 p-4 pt-16 lg:gap-6 lg:p-6 lg:pt-24"
      >
        
        {/* Mobile: Stacked Layout */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Environment Description */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: isLoading ? 3.2 : 0.4 }}
            className="text-center breathe"
          >
            <div className="p-4 glass-card rounded-2xl glow-accent">
              <h2 className="font-playfair text-2xl font-bold text-foreground mb-1">
                {environment === 'library' ? 'Cozy Library' : 'Café Glow'}
              </h2>
              <p className="text-base text-muted-foreground">
                {environment === 'library' 
                  ? 'Warm fireplace, gentle rain sounds' 
                  : 'Jazz melodies, coffee aromas'
                }
              </p>
            </div>
          </motion.div>

          {/* Focus Timer */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: isLoading ? 3.4 : 0.5 }}
            className="flex justify-center"
          >
            <FocusTimer onStatusChange={setUserStatus} />
          </motion.div>

          {/* Bottom Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: isLoading ? 3.6 : 0.6 }}
            >
              <AvatarSystem
                currentUserStatus={userStatus}
                selectedAvatar={selectedAvatar}
                onAvatarChange={setSelectedAvatar}
              />
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: isLoading ? 3.8 : 0.7 }}
            >
              <AmbientSoundPanel />
            </motion.div>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <>
          {/* Avatar System - Left Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: isLoading ? 3.2 : 0.4 }}
            className="hidden lg:block col-span-3 row-span-6 row-start-3"
          >
            <AvatarSystem
              currentUserStatus={userStatus}
              selectedAvatar={selectedAvatar}
              onAvatarChange={setSelectedAvatar}
            />
          </motion.div>

          {/* Focus Timer - Center */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: isLoading ? 3.4 : 0.5 }}
            className="hidden lg:flex col-span-6 row-span-8 row-start-2 flex-col items-center justify-center space-y-8"
          >
            {/* Environment Description - Centered */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: isLoading ? 3.6 : 0.6 }}
              className="text-center breathe"
            >
              <div className="p-6 glass-card rounded-2xl glow-accent">
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-2">
                  {environment === 'library' ? 'Cozy Library' : 'Café Glow'}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {environment === 'library' 
                    ? 'Warm fireplace, gentle rain sounds' 
                    : 'Jazz melodies, coffee aromas'
                  }
                </p>
              </div>
            </motion.div>

            <FocusTimer onStatusChange={setUserStatus} />
          </motion.div>

          {/* Ambient Sound Panel - Right Sidebar */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: isLoading ? 3.8 : 0.7 }}
            className="hidden lg:block col-span-3 row-span-6 row-start-3"
          >
            <AmbientSoundPanel />
          </motion.div>
        </>
      </motion.div>

    </div>
  );
};

export default Index;
