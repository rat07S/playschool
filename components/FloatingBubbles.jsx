'use client';
import { useEffect, useState } from 'react';

export default function FloatingBubbles({ count = 10 }) {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
    }));
    setBubbles(newBubbles);
  }, [count]);

  return (
    <>
      {bubbles.map((style, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 bg-white bg-opacity-40 rounded-full animate-[float_10s_linear_infinite]"
          style={style}
        ></div>
      ))}
    </>
  );
}
