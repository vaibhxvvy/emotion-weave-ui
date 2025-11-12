import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { ColorBendsBackground } from '@/components/ColorBendsBackground';
import { getLibrary, isAuthenticated } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Artwork {
  id: string;
  image_url: string;
  emotion: string;
  prompt: string;
  created_at: string;
}

const Library = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast({
        title: "Authentication required",
        description: "Please login to view your library",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    // Fetch user's library
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        const result = await getLibrary(50, 0);
        
        if (result.success && result.data) {
          setArtworks(result.data.artworks);
        } else {
          toast({
            title: "Failed to load library",
            description: result.error || "Please try again later",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Library fetch error:', error);
        toast({
          title: "Connection error",
          description: "Make sure your Flask backend is running",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, [navigate, toast]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ColorBendsBackground />
      <Header showAuth />

      <main className="relative z-10 container mx-auto px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Your Library</h1>
          <p className="text-muted-foreground mb-12">
            All your emotion-driven art in one place
          </p>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          ) : artworks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No artworks yet</p>
              <p className="text-muted-foreground text-sm mt-2">Start creating emotion-driven art in the chat</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((art, index) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel rounded-2xl overflow-hidden hover-lift cursor-pointer group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={art.image_url}
                      alt={art.emotion}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-foreground">{art.emotion}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(art.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Library;
