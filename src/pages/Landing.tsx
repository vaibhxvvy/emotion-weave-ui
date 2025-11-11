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
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-9xl font-bold gradient-text glow-text tracking-tight mb-4">
              EMOTIC
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl text-foreground/90 mb-6 font-light tracking-wide"
          >
            Turn Emotions into Art
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
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
      </main>

      {/* About Section */}
      <section className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">What is Emotic?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Emotic is where emotion meets intelligence. We've built a revolutionary platform that 
            understands how you feel and transforms those emotions into breathtaking visual art. 
            Whether you're expressing joy, contemplating loss, or exploring curiosity, Emotic captures 
            the essence of your emotional state and creates unique, personalized artwork that reflects your inner world.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl hover-lift"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-2xl">💭</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Text to Emotion</h3>
            <p className="text-muted-foreground">
              Simply type how you feel. Our AI understands the nuances of your emotions and captures 
              them in visual form.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl hover-lift"
          >
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <span className="text-2xl">🎤</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Voice to Art</h3>
            <p className="text-muted-foreground">
              Speak your feelings naturally. We analyze tone, pace, and emotion to create art that 
              truly represents you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl hover-lift"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Instant Creation</h3>
            <p className="text-muted-foreground">
              Watch in real-time as your emotions transform into unique, stunning artwork. Every piece 
              is one-of-a-kind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to turn your emotions into beautiful art
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
              1
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Express Yourself</h3>
              <p className="text-muted-foreground text-lg">
                Type or speak your emotions. Be as detailed or brief as you like. There's no wrong way to express how you feel.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse items-center gap-8"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-2xl font-bold text-secondary-foreground">
              2
            </div>
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">AI Understanding</h3>
              <p className="text-muted-foreground text-lg">
                Our advanced AI analyzes your emotional state, detecting subtle nuances in your words or voice to truly understand what you're feeling.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl font-bold text-accent-foreground">
              3
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Art Generation</h3>
              <p className="text-muted-foreground text-lg">
                Watch as your emotions materialize into stunning visual art. Save, share, or create again. Your emotional journey becomes a gallery.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center glass-panel p-12 rounded-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Feel Your Art</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join thousands discovering the intersection of emotion and creativity. 
            Your feelings deserve to be seen.
          </p>
          <Button
            size="lg"
            onClick={handleTryNow}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-full hover-lift shadow-lg shadow-primary/30"
          >
            Start Creating Now
          </Button>
        </motion.div>
      </section>

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
