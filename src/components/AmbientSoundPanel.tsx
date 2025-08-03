import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Flame, Droplets, Coffee, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Sound {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  url?: string; // In real app, would link to audio files
}

export const AmbientSoundPanel = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState([70]);
  const [isPlaying, setIsPlaying] = useState(false);

  const sounds: Sound[] = [
    { id: 'fireplace', name: 'Fireplace', icon: Flame, color: 'text-orange-500' },
    { id: 'rain', name: 'Rain', icon: Droplets, color: 'text-blue-500' },
    { id: 'cafe', name: 'Café Jazz', icon: Coffee, color: 'text-amber-600' },
    { id: 'ambient', name: 'Ambient', icon: Music, color: 'text-purple-500' },
  ];

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      // Stop current sound
      setActiveSound(null);
      setIsPlaying(false);
    } else {
      // Switch to new sound
      setActiveSound(soundId);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (activeSound) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="p-4 glass-panel rounded-xl glow-accent"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-playfair font-semibold text-lg">Ambient Sounds</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            disabled={!activeSound}
            className="w-8 h-8 p-0"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button
            variant="ghost" 
            size="sm"
            onClick={() => setVolume([0])}
            className="w-8 h-8 p-0"
          >
            {volume[0] === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
        </div>
      </div>

      {/* Sound Selection */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {sounds.map((sound) => {
          const Icon = sound.icon;
          const isActive = activeSound === sound.id;
          
          return (
            <motion.button
              key={sound.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSound(sound.id)}
              className={`
                flex items-center gap-2 p-3 rounded-lg border transition-all duration-200
                ${isActive 
                  ? 'bg-primary/10 border-primary text-primary glow-primary' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{sound.name}</span>
              {isActive && isPlaying && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-primary rounded-full ml-auto"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Volume</span>
          <span className="text-foreground font-medium">{volume[0]}%</span>
        </div>
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={5}
          className="w-full"
        />
      </div>

      {/* Now Playing */}
      {activeSound && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-3 border-t border-border/50"
        >
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-muted-foreground">Now playing:</span>
            <span className="text-foreground font-medium">
              {sounds.find(s => s.id === activeSound)?.name}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};