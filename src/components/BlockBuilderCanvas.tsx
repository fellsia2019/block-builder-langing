'use client';

import { useEffect, useRef } from 'react';

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
  targetOpacity: number;
  layer: number; // 0: Core, 1: Infrastructure, 2: UI
}

interface BlockBuilderCanvasProps {
  tilt?: { x: number; y: number };
}

export default function BlockBuilderCanvas({ tilt = { x: 0, y: 0 } }: BlockBuilderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - увеличиваем на 50% для обрезки при повороте
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * 1.5;
      canvas.height = height * 1.5;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Check if dark mode (with listener for theme changes)
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getColorForLayer = (layer: number): string => {
      if (isDarkMode) {
        switch (layer) {
          case 0: return 'rgba(99, 102, 241, 0.15)'; // Core - indigo
          case 1: return 'rgba(168, 85, 247, 0.15)'; // Infrastructure - purple
          case 2: return 'rgba(236, 72, 153, 0.15)'; // UI - pink
          default: return 'rgba(99, 102, 241, 0.15)';
        }
      } else {
        switch (layer) {
          case 0: return 'rgba(99, 102, 241, 0.2)'; // Core - indigo
          case 1: return 'rgba(168, 85, 247, 0.2)'; // Infrastructure - purple
          case 2: return 'rgba(236, 72, 153, 0.2)'; // UI - pink
          default: return 'rgba(99, 102, 241, 0.2)';
        }
      }
    };

    const getBorderColorForLayer = (layer: number): string => {
      if (isDarkMode) {
        switch (layer) {
          case 0: return 'rgba(99, 102, 241, 0.4)';
          case 1: return 'rgba(168, 85, 247, 0.4)';
          case 2: return 'rgba(236, 72, 153, 0.4)';
          default: return 'rgba(99, 102, 241, 0.4)';
        }
      } else {
        switch (layer) {
          case 0: return 'rgba(99, 102, 241, 0.5)';
          case 1: return 'rgba(168, 85, 247, 0.5)';
          case 2: return 'rgba(236, 72, 153, 0.5)';
          default: return 'rgba(99, 102, 241, 0.5)';
        }
      }
    };

    // Grid configuration
    const gridSize = 40;
    let gridColor = isDarkMode ? 'rgba(148, 163, 184, 0.05)' : 'rgba(148, 163, 184, 0.08)';
    
    // Create blocks
    const blocks: Block[] = [];
    // Уменьшаем количество блоков в 2 раза для мобильных и планшетов
    const isMobileOrTablet = window.innerWidth <= 1024;
    const blockCount = isMobileOrTablet ? Math.floor(25 / 2) : 25;
    
    // Видимая область находится в центре увеличенного canvas
    // Canvas увеличен на 50%, поэтому видимая область начинается с 25% от края
    const visibleOffsetX = canvas.width / 6; // 25% от начала (1.5x / 6 = 0.25)
    const visibleOffsetY = canvas.height / 6;
    const visibleWidth = canvas.width / 1.5; // Ширина видимой области
    const visibleHeight = canvas.height / 1.5; // Высота видимой области

    for (let i = 0; i < blockCount; i++) {
      const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
      const sizes = [
        { width: 60, height: 60 },
        { width: 80, height: 80 },
        { width: 100, height: 100 },
        { width: 120, height: 60 },
        { width: 60, height: 120 },
      ];
      const size = sizes[Math.floor(Math.random() * sizes.length)];

      blocks.push({
        // Создаем блоки в видимой области + небольшой запас для движения
        x: visibleOffsetX + Math.random() * (visibleWidth - size.width),
        y: visibleOffsetY + Math.random() * (visibleHeight - size.height),
        width: size.width,
        height: size.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: getColorForLayer(layer),
        opacity: 0,
        targetOpacity: 0.6 + Math.random() * 0.3,
        layer,
      });
    }

    // Update colors when theme changes
    const updateColors = () => {
      gridColor = isDarkMode ? 'rgba(148, 163, 184, 0.05)' : 'rgba(148, 163, 184, 0.08)';
      // Update block colors
      blocks.forEach((block) => {
        block.color = getColorForLayer(block.layer);
      });
    };
    
    const handleThemeChange = (e: MediaQueryListEvent) => {
      isDarkMode = e.matches;
      updateColors();
    };
    darkModeQuery.addEventListener('change', handleThemeChange);

    // Connection lines between nearby blocks
    const connectionDistance = 200;
    const connections: Array<[number, number]> = [];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw blocks
      blocks.forEach((block, i) => {
        // Update position
        block.x += block.vx;
        block.y += block.vy;

        // Bounce off edges
        if (block.x <= 0 || block.x + block.width >= canvas.width) {
          block.vx *= -1;
        }
        if (block.y <= 0 || block.y + block.height >= canvas.height) {
          block.vy *= -1;
        }

        // Keep in bounds
        block.x = Math.max(0, Math.min(canvas.width - block.width, block.x));
        block.y = Math.max(0, Math.min(canvas.height - block.height, block.y));

        // Fade in animation
        block.opacity += (block.targetOpacity - block.opacity) * 0.02;

        // Draw block shadow
        ctx.fillStyle = `rgba(0, 0, 0, ${block.opacity * 0.1})`;
        ctx.fillRect(
          block.x + 3,
          block.y + 3,
          block.width,
          block.height
        );

        // Draw block
        ctx.fillStyle = block.color.replace('0.15', String(block.opacity * 0.15)).replace('0.2', String(block.opacity * 0.2));
        ctx.fillRect(block.x, block.y, block.width, block.height);

        // Draw border
        ctx.strokeStyle = getBorderColorForLayer(block.layer).replace('0.4', String(block.opacity * 0.4)).replace('0.5', String(block.opacity * 0.5));
        ctx.lineWidth = 2;
        ctx.strokeRect(block.x, block.y, block.width, block.height);

        // Draw layer indicator (small corner)
        ctx.fillStyle = getBorderColorForLayer(block.layer).replace('0.4', String(block.opacity * 0.6)).replace('0.5', String(block.opacity * 0.7));
        ctx.fillRect(block.x, block.y, 8, 8);
      });

      // Draw connections between nearby blocks
      ctx.strokeStyle = isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;
      connections.length = 0;

      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const block1 = blocks[i];
          const block2 = blocks[j];

          const dx = (block1.x + block1.width / 2) - (block2.x + block2.width / 2);
          const dy = (block1.y + block1.height / 2) - (block2.y + block2.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = isDarkMode 
              ? `rgba(148, 163, 184, ${opacity})`
              : `rgba(148, 163, 184, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(
              block1.x + block1.width / 2,
              block1.y + block1.height / 2
            );
            ctx.lineTo(
              block2.x + block2.width / 2,
              block2.y + block2.height / 2
            );
            ctx.stroke();
          }
        }
      }

      // Draw architectural layers visualization (subtle)
      const layerHeight = canvas.height / 3;
      const layerColors = [
        isDarkMode ? 'rgba(99, 102, 241, 0.02)' : 'rgba(99, 102, 241, 0.03)',
        isDarkMode ? 'rgba(168, 85, 247, 0.02)' : 'rgba(168, 85, 247, 0.03)',
        isDarkMode ? 'rgba(236, 72, 153, 0.02)' : 'rgba(236, 72, 153, 0.03)',
      ];

      ctx.fillStyle = layerColors[0];
      ctx.fillRect(0, canvas.height - layerHeight, canvas.width, layerHeight);
      ctx.fillStyle = layerColors[1];
      ctx.fillRect(0, canvas.height - layerHeight * 2, canvas.width, layerHeight);
      ctx.fillStyle = layerColors[2];
      ctx.fillRect(0, canvas.height - layerHeight * 3, canvas.width, layerHeight);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      darkModeQuery.removeEventListener('change', handleThemeChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{
          opacity: 0.7,
          width: '150%',
          height: '150%',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
}
