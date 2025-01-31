import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSTube = ({ onAnimationEnd }) => {  // Accept callback as prop
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;

    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(ww, wh);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
    camera.position.z = 400;

    const points = [
      [68.5, 185.5],
      [1, 262.5],
      [270.9, 281.9],
      [345.5, 212.8],
      [178, 155.7],
      [240.3, 72.3],
      [153.4, 0.6],
      [52.6, 53.3],
      [68.5, 185.5],
    ].map(([x, z]) => new THREE.Vector3(x, 0, z));

    const path = new THREE.CatmullRomCurve3(points);

    const geometry = new THREE.TubeGeometry(path, 300, 2, 20, true);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.BackSide,
      wireframe: true,
    });

    const tube = new THREE.Mesh(geometry, material);
    scene.add(tube);

    let percentage = 0;
    let animationFrameId;

    const render = () => {
      percentage += 0.001;
      const p1 = path.getPointAt(percentage % 1);
      const p2 = path.getPointAt((percentage + 0.01) % 1);
      camera.position.set(p1.x, p1.y, p1.z);
      camera.lookAt(p2);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    // Start rendering
    render();

    // Start fading after 3 seconds
    const startFade = setTimeout(() => {
      let opacity = 0;
      const fadeInterval = setInterval(() => {
        opacity += 0.02;
        overlay.style.opacity = opacity;

        if (opacity >= 1) {
          clearInterval(fadeInterval);
          cancelAnimationFrame(animationFrameId); // Stop the animation
          onAnimationEnd(); // Trigger the callback to move to Bod component
        }
      }, 50); // Gradual fade every 50ms
    }, 3000);

    const handleResize = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      camera.aspect = ww / wh;
      camera.updateProjectionMatrix();
      renderer.setSize(ww, wh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(startFade); // Clear the fade timeout if the component unmounts
      cancelAnimationFrame(animationFrameId); // Cancel the animation frame
    };
  }, [onAnimationEnd]);

  return (
    <div>
        
      {/* Canvas for Three.js */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Overlay for fading effect */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'black',
          opacity: 0,
          transition: 'opacity 1s',
          pointerEvents: 'none', // Ensure it doesn't block interactions
        }}
      />
    </div>
  );
};

export default ThreeJSTube;
