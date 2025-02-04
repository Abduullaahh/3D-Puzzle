import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Vector3, Matrix4 } from 'three';
import { useGameStore } from '../store/gameStore';

interface CubeletProps {
  position: [number, number, number];
  colors: string[];
  onRotate: (axis: 'x' | 'y' | 'z', direction: 1 | -1) => void;
}

const Cubelet: React.FC<CubeletProps> = ({ position, colors, onRotate }) => {
  const meshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { camera } = useThree();

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    const face = Math.floor(e.faceIndex / 2);
    const normal = new Vector3();
    if (face === 0) normal.set(1, 0, 0);
    else if (face === 1) normal.set(0, 1, 0);
    else normal.set(0, 0, 1);

    normal.applyMatrix4(new Matrix4().extractRotation(camera.matrix));
    const axis = ['x', 'y', 'z'][Math.abs(normal.toArray().indexOf(Math.max(...normal.toArray().map(Math.abs))))] as 'x' | 'y' | 'z';
    const direction = e.face.normal.dot(camera.position) > 0 ? 1 : -1;
    onRotate(axis, direction as 1 | -1);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
    >
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      {colors.map((color, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          color={color}
          emissive={isHovered ? color : '#000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      ))}
    </mesh>
  );
};

export const RubiksCube: React.FC = () => {
  const { difficulty, updateScore, setSolved } = useGameStore();
  const size = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
  const [cubelets, setCubelets] = useState<Array<{ position: [number, number, number], colors: string[] }>>([]);
  const [moves, setMoves] = useState<number>(0);
  const initializedRef = useRef(false);

  // Initialize cubelets
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const initialCubelets = [];
    
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const position: [number, number, number] = [
            x - (size - 1) / 2,
            y - (size - 1) / 2,
            z - (size - 1) / 2
          ];
          
          const cubeletColors = colors.map((color, index) => {
            if (index === 0 && x === size - 1) return color;
            if (index === 1 && x === 0) return color;
            if (index === 2 && y === size - 1) return color;
            if (index === 3 && y === 0) return color;
            if (index === 4 && z === size - 1) return color;
            if (index === 5 && z === 0) return color;
            return '#333333';
          });
          
          initialCubelets.push({ position, colors: cubeletColors });
        }
      }
    }
    setCubelets(initialCubelets);
  }, [size]);

  // Check if puzzle is solved
  const checkSolved = useCallback((newCubelets: Array<{ position: [number, number, number], colors: string[] }>) => {
    const isSolved = newCubelets.every(cubelet => {
      const [x, y, z] = cubelet.position;
      return Math.abs(x) === Math.floor(size / 2) ||
             Math.abs(y) === Math.floor(size / 2) ||
             Math.abs(z) === Math.floor(size / 2);
    });

    if (isSolved) {
      setSolved(true);
      updateScore(5000); // Add bonus points directly instead of using a callback
    }
  }, [size, setSolved, updateScore]);

  const handleRotate = useCallback((axis: 'x' | 'y' | 'z', direction: 1 | -1) => {
    setMoves(prevMoves => {
      const newMoves = prevMoves + 1;
      updateScore(Math.max(1000 - newMoves * 10, 0));
      return newMoves;
    });

    setCubelets(prevCubelets => {
      const newCubelets = prevCubelets.map(cubelet => {
        const [x, y, z] = cubelet.position;
        let newPosition: [number, number, number] = [x, y, z];
        
        if (axis === 'x') newPosition = [x, z * direction * -1, y * direction];
        else if (axis === 'y') newPosition = [z * direction, y, x * direction * -1];
        else newPosition = [y * direction * -1, x * direction, z];
        
        return {
          ...cubelet,
          position: newPosition
        };
      });

      // Use requestAnimationFrame to defer the solved check
      requestAnimationFrame(() => checkSolved(newCubelets));

      return newCubelets;
    });
  }, [checkSolved, updateScore]);

  return (
    <group>
      {cubelets.map((cubelet, index) => (
        <Cubelet
          key={index}
          position={cubelet.position}
          colors={cubelet.colors}
          onRotate={handleRotate}
        />
      ))}
    </group>
  );
};