import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface ParticleEffectProps {
  environment: 'library' | 'cafe';
  count?: number;
}

export const ParticleEffect = ({ environment, count = 15 }: ParticleEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
      });
    }
    setParticles(newParticles);
  }, [count]);

  const getParticleStyle = () => {
    if (environment === 'library') {
      return {
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.2))',
        boxShadow: '0 0 10px hsl(var(--primary) / 0.4)',
      };
    } else {
      return {
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.7), hsl(var(--accent) / 0.3))',
        boxShadow: '0 0 8px hsl(var(--primary) / 0.5)',
      };
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            ...getParticleStyle(),
          }}
          animate={{
            y: [-20, -80, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating embers for library */}
      {environment === 'library' && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`ember-${i}`}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${60 + Math.random() * 30}%`,
                background: 'linear-gradient(45deg, hsl(25 85% 70%), hsl(15 90% 65%))',
                boxShadow: '0 0 6px hsl(25 85% 70% / 0.8)',
              }}
              animate={{
                y: [-5, -40],
                x: [-3, 3, -3],
                opacity: [0.6, 0.8, 0.1],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Steam effects for cafe */}
      {environment === 'cafe' && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`steam-${i}`}
              className="absolute rounded-full opacity-30"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${70 + Math.random() * 20}%`,
                width: '6px',
                height: '6px',
                background: 'radial-gradient(circle, hsl(var(--foreground) / 0.3), transparent)',
              }}
              animate={{
                y: [-10, -60],
                x: [-2, 4, -2],
                opacity: [0.3, 0.6, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};