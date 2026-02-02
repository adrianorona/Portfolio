import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './Globe.css';

const GLOBE_RADIUS = 1.8;

// Create glowing particle texture
const createGlowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  const centerX = 32;
  const centerY = 32;
  
  // Soft glowing dot
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.4, 'rgba(255, 240, 220, 0.3)');
  gradient.addColorStop(0.7, 'rgba(255, 200, 150, 0.1)');
  gradient.addColorStop(1, 'rgba(255, 180, 120, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// World map data
const worldMapData = `
-17,37,-5,36,0,35,10,37,12,33,25,32,35,30,40,23,43,12,51,12,51,2,42,-2,40,-12,35,-20,33,-27,28,-34,20,-35,18,-30,12,-25,14,-18,8,-5,5,5,-5,5,-12,6,-17,12,-18,20,-17,37
-10,36,-8,43,-5,43,0,42,3,43,5,48,2,50,-5,49,-5,54,5,54,8,54,12,55,10,58,18,57,24,55,28,60,30,70,20,71,10,64,5,62,-2,59,-5,58,-10,50,-10,43,-10,36
30,70,40,68,50,70,60,73,70,72,85,77,100,77,120,72,140,68,160,65,170,67,180,65,180,60,170,55,155,50,140,50,135,55,130,48,140,45,145,43,130,35,127,38,120,40,120,50,100,50,90,45,80,50,70,55,60,55,50,60,40,60,30,55,25,52,30,70
75,40,80,35,85,30,95,25,100,22,105,22,110,20,115,22,120,25,122,30,125,35,130,35,128,38,123,37,120,40,115,40,110,37,105,35,100,40,95,38,90,40,85,38,80,40,75,40
68,35,70,30,72,25,75,20,77,15,78,8,80,10,82,15,85,20,88,22,92,22,95,18,97,25,90,28,85,30,80,32,75,35,68,35
95,20,100,18,105,15,108,12,110,5,105,0,100,-5,105,-8,115,-8,120,-5,120,5,115,10,110,15,105,18,100,20,95,20
25,38,30,37,35,38,42,37,48,35,52,30,55,25,60,25,65,28,70,30,68,35,60,35,55,33,50,38,45,40,40,42,35,40,30,40,25,38
113,-10,120,-12,130,-12,140,-15,145,-18,150,-22,153,-28,150,-35,145,-38,140,-38,135,-35,130,-33,125,-30,120,-25,115,-22,113,-18,113,-10
-170,65,-168,60,-165,55,-160,58,-155,60,-145,62,-140,60,-135,58,-130,55,-125,50,-122,48,-124,45,-120,40,-118,35,-115,32,-110,30,-105,28,-100,26,-95,26,-90,30,-85,30,-80,28,-82,25,-80,27,-75,35,-70,42,-68,45,-66,50,-60,47,-55,48,-52,50,-56,52,-62,55,-68,58,-75,60,-80,62,-85,65,-95,70,-105,72,-120,72,-140,70,-155,68,-165,66,-170,65
-80,10,-75,12,-70,12,-65,10,-60,5,-55,0,-50,-5,-45,-10,-42,-15,-40,-20,-42,-25,-47,-30,-52,-35,-58,-40,-65,-45,-68,-52,-72,-50,-75,-45,-76,-40,-74,-35,-72,-30,-75,-25,-78,-20,-80,-15,-81,-10,-80,-5,-78,0,-80,5,-80,10
-45,60,-42,65,-38,70,-32,75,-25,78,-20,76,-25,72,-30,68,-38,65,-43,62,-45,60
-10,50,-6,52,-5,55,-3,58,0,59,2,53,0,51,-5,50,-8,52,-10,50
130,32,132,34,135,36,140,40,142,43,145,45,144,42,141,38,138,35,135,33,130,32
166,-35,170,-37,174,-40,178,-42,176,-45,172,-45,168,-43,166,-40,166,-35
43,-12,47,-14,50,-18,50,-23,47,-25,44,-24,43,-20,43,-12
117,5,120,8,122,12,124,16,126,18,125,14,122,10,119,7,117,5
95,5,100,2,105,-2,108,-5,112,-7,118,-8,122,-8,127,-5,130,-3,135,-5,140,-6,137,-2,130,0,125,2,120,3,115,2,110,0,105,3,100,5,95,5
120,22,121,24,122,25,121,23,120,22
80,7,81,9,82,8,81,6,80,7
-85,20,-82,21,-78,22,-75,20,-77,19,-80,20,-84,21,-85,20
`;

// Parse world map and create points
const getGlobePoints = () => {
  const points = [];
  const randomOffsets = [];
  const radius = GLOBE_RADIUS + 0.02;
  
  const lines = worldMapData.trim().split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('//') || line.trim() === '') return;
    
    const coords = line.split(',').map(n => parseFloat(n.trim()));
    const polygonPoints = [];
    
    for (let i = 0; i < coords.length - 1; i += 2) {
      polygonPoints.push({ lon: coords[i], lat: coords[i + 1] });
    }
    
    if (polygonPoints.length >= 3) {
      fillPolygonWithPoints(polygonPoints, points, randomOffsets, radius);
    }
  });
  
  return {
    positions: new Float32Array(points),
    randomOffsets: new Float32Array(randomOffsets)
  };
};

function fillPolygonWithPoints(polygon, points, randomOffsets, radius) {
  let minLat = Infinity, maxLat = -Infinity;
  let minLon = Infinity, maxLon = -Infinity;
  
  polygon.forEach(p => {
    minLat = Math.min(minLat, p.lat);
    maxLat = Math.max(maxLat, p.lat);
    minLon = Math.min(minLon, p.lon);
    maxLon = Math.max(maxLon, p.lon);
  });
  
  const area = (maxLat - minLat) * (maxLon - minLon);
  const density = Math.max(1000, Math.min(5000, area * 4));
  
  for (let i = 0; i < density; i++) {
    const lat = minLat + Math.random() * (maxLat - minLat);
    const lon = minLon + Math.random() * (maxLon - minLon);
    
    if (pointInPolygon(lat, lon, polygon)) {
      const jitterLat = lat + (Math.random() - 0.5) * 1.0;
      const jitterLon = lon + (Math.random() - 0.5) * 1.0;
      
      const phi = (90 - jitterLat) * (Math.PI / 180);
      const theta = (jitterLon + 180) * (Math.PI / 180);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      points.push(x, y, z);
      randomOffsets.push(Math.random() * Math.PI * 2);
    }
  }
  
  // Edge points
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];
    
    const dist = Math.sqrt(Math.pow(p2.lat - p1.lat, 2) + Math.pow(p2.lon - p1.lon, 2));
    const numEdgePoints = Math.floor(dist * 5);
    
    for (let j = 0; j < numEdgePoints; j++) {
      const t = j / numEdgePoints;
      const lat = p1.lat + t * (p2.lat - p1.lat) + (Math.random() - 0.5) * 0.4;
      const lon = p1.lon + t * (p2.lon - p1.lon) + (Math.random() - 0.5) * 0.4;
      
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      points.push(x, y, z);
      randomOffsets.push(Math.random() * Math.PI * 2);
    }
  }
}

function pointInPolygon(lat, lon, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lon, yi = polygon[i].lat;
    const xj = polygon[j].lon, yj = polygon[j].lat;
    
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

// Glowing animated particles shader - on/off pattern with flowing waves
const GlowingPointsMaterial = ({ glowPosition }) => {
  const materialRef = useRef();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  const texture = useMemo(() => createGlowTexture(), []);

  return (
    <shaderMaterial
      ref={materialRef}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      uniforms={{
        time: { value: 0 },
        pointTexture: { value: texture },
      }}
      vertexShader={`
        attribute float randomOffset;
        
        varying float vBrightness;
        
        uniform float time;
        
        void main() {
          vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          vec3 pointDir = normalize(worldPos);
          
          // === WAVE PATTERN - lights turn on/off in waves ===
          
          // Wave 1 - sweeps around horizontally
          float angle1 = atan(pointDir.z, pointDir.x);
          float wave1 = sin(angle1 * 2.0 - time * 0.8) * 0.5 + 0.5;
          
          // Wave 2 - sweeps vertically
          float wave2 = sin(pointDir.y * 3.0 + time * 0.6) * 0.5 + 0.5;
          
          // Wave 3 - diagonal spiral
          float spiral = angle1 + pointDir.y * 2.0;
          float wave3 = sin(spiral * 1.5 - time * 0.5) * 0.5 + 0.5;
          
          // Combine waves
          float pattern = wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3;
          
          // Sharp on/off threshold with smooth edges
          float onOff = smoothstep(0.35, 0.5, pattern);
          
          // Add random individual blink for extra sparkle
          float blinkSpeed = 2.0 + randomOffset * 4.0;
          float blink = sin(time * blinkSpeed + randomOffset * 50.0);
          blink = step(0.7, blink * 0.5 + 0.5); // Sharp on/off
          
          // Random chance to be "special" - blinks independently
          float isSpecial = step(0.85, randomOffset);
          float specialBlink = blink * isSpecial;
          
          // Final brightness - pattern + special blinks
          vBrightness = max(onOff, specialBlink);
          
          // Base visibility so dots don't fully disappear
          vBrightness = 0.15 + vBrightness * 0.85;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Size changes with brightness
          float baseSize = 0.015;
          float onSize = vBrightness * 0.025;
          gl_PointSize = (baseSize + onSize) * (300.0 / -mvPosition.z);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `}
      fragmentShader={`
        uniform sampler2D pointTexture;
        
        varying float vBrightness;
        
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          
          // Dim grey when off
          vec3 offColor = vec3(0.4, 0.42, 0.5);
          
          // Bright warm white when on
          vec3 onColor = vec3(1.0, 0.95, 0.9);
          
          // Mix based on brightness
          vec3 finalColor = mix(offColor, onColor, vBrightness);
          
          float alpha = texColor.a * (0.3 + vBrightness * 0.7);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `}
    />
  );
};

// Animated glow position controller (kept for compatibility but not used in new shader)
const GlowController = ({ glowPosition }) => {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = time * 0.15;
    const x = Math.cos(angle);
    const y = Math.sin(angle * 0.5) * 0.3;
    const z = Math.sin(angle);
    glowPosition.current.set(x, y, z).normalize();
  });
  
  return null;
};

// Solid dark core
const GlobeCore = () => {
  const coreRef = useRef();
  
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.02;
    }
  });
  
  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[GLOBE_RADIUS - 0.01, 64, 64]} />
      <meshBasicMaterial color="#080810" />
    </mesh>
  );
};

// Glowing particle continents
const ParticleLayer = ({ glowPosition }) => {
  const meshRef = useRef();
  
  const { positions, randomOffsets } = useMemo(() => getGlobePoints(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-randomOffset"
          count={randomOffsets.length}
          array={randomOffsets}
          itemSize={1}
        />
      </bufferGeometry>
      <GlowingPointsMaterial glowPosition={glowPosition} />
    </points>
  );
};

// Scene setup with intro animation
const Scene = () => {
  const { camera } = useThree();
  const glowPosition = useRef(new THREE.Vector3(1, 0, 0));
  const introProgress = useRef(0);
  const introComplete = useRef(false);
  
  useEffect(() => {
    // Start camera close (zoomed in)
    camera.position.set(0, 0, 2.5);
  }, [camera]);

  // Animate camera zoom out on load
  useFrame((state, delta) => {
    if (!introComplete.current) {
      introProgress.current += delta * 0.35; // Speed of animation
      
      if (introProgress.current >= 1) {
        introProgress.current = 1;
        introComplete.current = true;
      }
      
      // Easing function for smooth animation
      const t = introProgress.current;
      const eased = 1 - Math.pow(1 - t, 3); // Ease out cubic
      
      // Interpolate camera position from close to far
      const startZ = 2.5;
      const endZ = 7;
      const startY = 0;
      const endY = 0;
      
      camera.position.z = startZ + (endZ - startZ) * eased;
      camera.position.y = startY + (endY - startY) * eased;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#ffffff" />
      
      {/* Glow position animator */}
      <GlowController glowPosition={glowPosition} />
      
      {/* Solid dark core */}
      <GlobeCore />
      
      {/* Glowing particle continents */}
      <ParticleLayer glowPosition={glowPosition} />
      
      <OrbitControls 
        enableZoom={true}
        enableRotate={true}
        enablePan={false}
        minDistance={4}
        maxDistance={15}
        autoRotate={false}
        rotateSpeed={1}
        zoomSpeed={1}
      />
    </>
  );
};

// Main component
const Globe = () => {
  return (
    <div className="globe-container">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#000000']} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default Globe;
