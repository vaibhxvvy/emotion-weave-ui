import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { ColorBendsBackground } from '@/components/ColorBendsBackground';

const Library = () => {
  // Mock data for now
  const artworks = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      emotion: 'Contemplative',
      date: '2025-01-15',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
      emotion: 'Joyful',
      date: '2025-01-14',
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
      emotion: 'Peaceful',
      date: '2025-01-13',
    },
  ];

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
                    src={art.imageUrl}
                    alt={art.emotion}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground">{art.emotion}</p>
                  <p className="text-xs text-muted-foreground">{art.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Library;
