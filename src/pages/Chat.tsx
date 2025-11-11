import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColorBendsBackground } from '@/components/ColorBendsBackground';
import { AuthModal } from '@/components/AuthModal';
import { Header } from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { HiMicrophone, HiPaperAirplane } from 'react-icons/hi2';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  emotion?: string;
  imageUrl?: string;
}

const Chat = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is in guest mode
    const guestMode = sessionStorage.getItem('emotic_guest');
    setIsGuest(!!guestMode);

    // Welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'assistant',
          content: 'Welcome to Emotic. Share your emotions, and I\'ll create art that captures your feelings. What are you feeling today?',
        },
      ]);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I sense a mix of emotions in your message. Let me create something that captures this feeling...`,
        emotion: 'contemplative',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop', // Placeholder
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice input started",
        description: "Speak your emotions...",
      });
    } else {
      toast({
        title: "Processing voice...",
        description: "Converting your emotions to art",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ColorBendsBackground />
      
      <Header 
        showAuth 
        onAuthClick={() => setAuthOpen(true)} 
        isGuest={isGuest}
      />

      {/* Chat Container */}
      <main className="relative z-10 container mx-auto px-6 pt-24 pb-32 max-w-4xl">
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'glass-panel'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {message.imageUrl && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 rounded-lg overflow-hidden"
                    >
                      <img
                        src={message.imageUrl}
                        alt="Generated art"
                        className="w-full h-auto"
                      />
                    </motion.div>
                  )}
                  
                  {message.emotion && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Emotion: <span className="text-secondary">{message.emotion}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="glass-panel p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-full p-2 flex items-center gap-2 shadow-2xl"
          >
            <Button
              size="icon"
              variant="ghost"
              onClick={handleVoiceInput}
              className={`rounded-full hover:bg-primary/20 transition-all ${
                isRecording ? 'bg-primary text-primary-foreground animate-pulse' : ''
              }`}
            >
              <HiMicrophone className="w-5 h-5" />
            </Button>

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your emotions..."
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLoading}
            />

            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <HiPaperAirplane className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
};

export default Chat;
