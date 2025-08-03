import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FocusTimerProps {
  onStatusChange: (status: 'focused' | 'break' | 'idle') => void;
}

export const FocusTimer = ({ onStatusChange }: FocusTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [sessionLength] = useState({ focus: 25 * 60, break: 5 * 60 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      onStatusChange(sessionType === 'focus' ? 'focused' : 'break');
    } else if (timeLeft === 0) {
      // Session completed
      setIsRunning(false);
      const nextType = sessionType === 'focus' ? 'break' : 'focus';
      setSessionType(nextType);
      setTimeLeft(sessionLength[nextType]);
      onStatusChange('idle');
      
      // Celebration effect when session completes
      setTimeout(() => {
        // Could add confetti or sparkle effects here
      }, 100);
    } else {
      onStatusChange('idle');
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType, sessionLength, onStatusChange]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionLength[sessionType]);
  };

  const progress = ((sessionLength[sessionType] - timeLeft) / sessionLength[sessionType]) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Session Type Indicator */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center breathe"
      >
        <h3 className="font-playfair text-xl font-semibold text-foreground mb-1">
          {sessionType === 'focus' ? 'Focus Time' : 'Break Time'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {sessionType === 'focus' ? 'Deep work session' : 'Rest and recharge'}
        </p>
      </motion.div>

      {/* Circular Timer */}
      <div className="relative">
        <motion.div
          className="timer-glow breathe"
          animate={isRunning ? { scale: [1, 1.01, 1] } : {}}
          transition={{ duration: 3, repeat: isRunning ? Infinity : 0 }}
        >
          <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full glass-card border-4 border-primary/20 flex items-center justify-center glow-accent">
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--muted))"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="glow-primary"
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
            
            {/* Time Display */}
            <div className="text-center z-10">
              <motion.div
                key={timeLeft}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="font-mono text-4xl font-bold text-foreground"
              >
                {formatTime(timeLeft)}
              </motion.div>
              <div className="text-sm text-muted-foreground mt-1">
                {Math.round(progress)}% complete
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4"
      >
        <Button
          onClick={toggleTimer}
          size="lg"
          className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span className="ml-2">{isRunning ? 'Pause' : 'Start'}</span>
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
          className="h-14 px-6 border-border/50 hover:bg-muted/50"
        >
          <RotateCcw size={20} />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="h-14 px-6 text-muted-foreground hover:text-foreground"
        >
          <Settings size={20} />
        </Button>
      </motion.div>
    </div>
  );
};