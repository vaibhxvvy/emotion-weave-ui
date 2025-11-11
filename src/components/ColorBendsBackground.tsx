import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ColorBendsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Gradient positions - more vibrant and dynamic
    const gradients = [
      { x: 0.15, y: 0.25, size: 0.5, color: 'rgba(17, 100, 102, 0.25)' }, // emotion teal - stronger
      { x: 0.75, y: 0.55, size: 0.45, color: 'rgba(217, 176, 140, 0.18)' }, // copper gold - stronger
      { x: 0.5, y: 0.75, size: 0.4, color: 'rgba(255, 203, 169, 0.12)' }, // warm sand
      { x: 0.85, y: 0.15, size: 0.35, color: 'rgba(209, 232, 226, 0.1)' }, // frosted silver
    ];

    // Animate gradients - slower, more organic movement
    gradients.forEach((grad, i) => {
      gsap.to(grad, {
        x: `+=${Math.random() * 0.3 - 0.15}`,
        y: `+=${Math.random() * 0.3 - 0.15}`,
        duration: 12 + i * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      // Add size pulsing
      gsap.to(grad, {
        size: `+=${Math.random() * 0.1 - 0.05}`,
        duration: 10 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gradients.forEach((grad) => {
        const gradient = ctx.createRadialGradient(
          grad.x * canvas.width,
          grad.y * canvas.height,
          0,
          grad.x * canvas.width,
          grad.y * canvas.height,
          grad.size * Math.max(canvas.width, canvas.height)
        );

        gradient.addColorStop(0, grad.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
