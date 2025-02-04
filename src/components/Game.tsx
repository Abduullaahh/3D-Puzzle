import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import { RubiksCube } from './RubiksCube';

export const Game: React.FC = () => {
  const { isPlaying, isPaused, timeElapsed, updateTime } = useGameStore();

  useEffect(() => {
    let interval: number;
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        updateTime(timeElapsed + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, timeElapsed, updateTime]);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RubiksCube />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
};