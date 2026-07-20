import { useRef, useEffect, useCallback } from 'react';

interface CanvasTextProps {
  text: string;
  bgColor?: string;
  colors?: string[];
  lineGap?: number;
  animationSpeed?: number;
}

export function CanvasText({
  text,
  bgColor = '#2563eb',
  colors = [
    'rgba(255,255,255,0.18)',
    'rgba(255,255,255,0.12)',
    'rgba(255,255,255,0.08)',
    'rgba(255,255,255,0.05)',
    'rgba(255,255,255,0.03)',
  ],
  lineGap = 6,
  animationSpeed = 0.4,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const W = rect.width;
    const H = rect.height;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, W, H);

    const lineH = lineGap + 2;
    const total = Math.ceil(H / lineH) + 2;

    for (let i = 0; i < total; i++) {
      const color = colors[i % colors.length] ?? 'rgba(255,255,255,0.05)';
      ctx.fillStyle = color;
      const y = ((i * lineH + offsetRef.current) % (H + lineH)) - lineH;
      ctx.fillRect(0, y, W, 2);
    }

    offsetRef.current = (offsetRef.current + animationSpeed) % lineH;
    animRef.current = requestAnimationFrame(draw);
  }, [colors, lineGap, animationSpeed]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <span
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        background: bgColor,
        borderRadius: 6,
        padding: '0 10px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 6,
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
        {text}
      </span>
    </span>
  );
}
