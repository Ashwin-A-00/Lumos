import { motion } from 'framer-motion';
import { User, Circle } from 'lucide-react';

interface Avatar {
  id: string;
  name: string;
  status: 'focused' | 'break' | 'idle';
  avatar: string;
}

interface AvatarSystemProps {
  currentUserStatus: 'focused' | 'break' | 'idle';
  selectedAvatar: string;
  onAvatarChange: (avatar: string) => void;
}

export const AvatarSystem = ({ currentUserStatus, selectedAvatar, onAvatarChange }: AvatarSystemProps) => {
  // Mock data for demo - in real app would come from backend
  const mockUsers: Avatar[] = [
    { id: '1', name: 'You', status: currentUserStatus, avatar: selectedAvatar },
    { id: '2', name: 'Alex', status: 'focused', avatar: '🧑‍💻' },
    { id: '3', name: 'Sam', status: 'break', avatar: '👩‍🎓' },
    { id: '4', name: 'Jordan', status: 'focused', avatar: '🧑‍🎨' },
    { id: '5', name: 'Casey', status: 'idle', avatar: '👨‍📚' },
  ];

  const avatarOptions = ['🧑‍💻', '👩‍🎓', '🧑‍🎨', '👨‍📚', '👩‍💼', '🧑‍🔬'];

  const getStatusColor = (status: 'focused' | 'break' | 'idle') => {
    switch (status) {
      case 'focused': return 'bg-green-500';
      case 'break': return 'bg-yellow-500';
      case 'idle': return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: 'focused' | 'break' | 'idle') => {
    switch (status) {
      case 'focused': return 'Focused';
      case 'break': return 'On Break';
      case 'idle': return 'Idle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar Selector */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-4 glass-panel rounded-xl glow-accent"
      >
        <h3 className="font-playfair font-semibold text-lg mb-3">Choose Your Avatar</h3>
        <div className="grid grid-cols-6 gap-2">
          {avatarOptions.map((avatar, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAvatarChange(avatar)}
              className={`
                w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl
                transition-all duration-200
                ${selectedAvatar === avatar 
                  ? 'border-primary bg-primary/10 glow-primary' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              {avatar}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Study Buddies */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 glass-panel rounded-xl glow-accent"
      >
        <h3 className="font-playfair font-semibold text-lg mb-4">Study Buddies Online</h3>
        <div className="space-y-3">
          {mockUsers.slice(0, 5).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-lg">
                  {user.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{user.name}</span>
                  {user.id === '1' && (
                    <span className="text-xs text-primary font-medium">(You)</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Circle size={6} className={`${getStatusColor(user.status)} fill-current`} />
                  <span className="text-xs text-muted-foreground">
                    {getStatusLabel(user.status)}
                  </span>
                </div>
              </div>

              {user.status === 'focused' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            {mockUsers.filter(u => u.status === 'focused').length} people focusing right now
          </p>
        </div>
      </motion.div>
    </div>
  );
};