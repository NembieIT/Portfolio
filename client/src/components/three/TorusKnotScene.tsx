import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** STITCH_THREEJS_START:ANIMATION_3 — wireframe torus knot with mouse parallax (logic preserved verbatim). */
export default function TorusKnotScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Artistic Abstract Geometry (Wireframe Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
      color: 0xbd00ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xbd00ff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    camera.position.z = 30;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    let animationFrameId = 0;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;

      // Subtle reaction to mouse
      mesh.position.x += (mouseX * 5 - mesh.position.x) * 0.05;
      mesh.position.y += (-mouseY * 5 - mesh.position.y) * 0.05;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="threejs-container-ANIMATION_3"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
