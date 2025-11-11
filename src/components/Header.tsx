import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  showAuth?: boolean;
  onAuthClick?: () => void;
  isGuest?: boolean;
}

export const Header = ({ showAuth = false, onAuthClick, isGuest = false }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.span
            className="text-2xl font-bold gradient-text tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            EMOTIC
          </motion.span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isGuest && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full glass-panel text-xs text-muted-foreground"
            >
              Guest Mode
            </motion.div>
          )}
          
          {showAuth && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAuthClick}
              className="glass-panel border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all"
            >
              {isGuest ? 'Continue with Account' : 'Account'}
            </Button>
          )}
          
          <Link to="/library">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10 transition-all"
            >
              Library
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
