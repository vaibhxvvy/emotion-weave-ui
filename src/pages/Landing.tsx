import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ColorBendsBackground } from '@/components/ColorBendsBackground';
import { AuthModal } from '@/components/AuthModal';
import { Header } from '@/components/Header';

const Landing = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleTryNow = () => {
    // Start guest session
    sessionStorage.setItem('emotic_guest', 'true');
    navigate('/chat');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ColorBendsBackground />
      
      <Header showAuth onAuthClick={() => setAuthOpen(true)} />

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-8xl font-bold gradient-text glow-text tracking-tight mb-4">
              EMOTIC
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-foreground/90 mb-6 font-light tracking-wide"
          >
            Turn Emotions into Art
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Experience emotion-driven creativity with AI. Express yourself through text or voice,
            and watch your feelings transform into stunning visual art.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              size="lg"
              onClick={handleTryNow}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full hover-lift shadow-lg shadow-primary/30"
            >
              Try Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setAuthOpen(true)}
              className="glass-panel border-primary/30 hover:border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg rounded-full hover-lift"
            >
              Login / Sign Up
            </Button>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            No account required to try. Experience the future of emotional creativity.
          </motion.p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-32 h-32 rounded-full bg-emotion-teal/10 blur-3xl"
          />
        </div>
        <div className="absolute bottom-1/4 right-10 animate-float" style={{ animationDelay: '1s' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-40 h-40 rounded-full bg-copper-gold/10 blur-3xl"
          />
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 right-8 text-sm text-muted-foreground"
      >
        <p>© 2025 Emotic. Feel your art.</p>
      </motion.footer>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
};

export default Landing;
