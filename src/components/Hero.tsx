import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fbff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting - softer, more diffused
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.BoxGeometry(1, 2, 1),
      new THREE.BoxGeometry(2, 1, 1),
      new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8),
      new THREE.SphereGeometry(0.4, 8, 6),
    ];
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xa8c8ec, roughness: 0.3, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0xffb5b5, roughness: 0.3, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0xb5e8b5, roughness: 0.3, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0xffeb9c, roughness: 0.3, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0xc4b5fd, roughness: 0.3, metalness: 0.1 }),
    ];

    const objects: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const object = new THREE.Mesh(geometry, material);
      object.position.x = (Math.random() - 0.5) * 20;
      object.position.y = (Math.random() - 0.5) * 20;
      object.position.z = (Math.random() - 0.5) * 20;
      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.5 + 0.2,
        floatOffset: Math.random() * Math.PI * 2,
      };
      scene.add(object);
      objects.push(object);
    }

    camera.position.z = 8;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = function () {
      requestAnimationFrame(animate);

      // Animate objects with individual properties
      objects.forEach((object) => {
        const time = Date.now() * 0.001;
        object.rotation.x += object.userData.rotationSpeed.x;
        object.rotation.y += object.userData.rotationSpeed.y;
        object.rotation.z += object.userData.rotationSpeed.z;

        // Add floating motion
        object.position.y += Math.sin(time * object.userData.floatSpeed + object.userData.floatOffset) * 0.01;
      });

      // Animate camera based on mouse position
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      const currentMount = mountRef.current;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return null;
}

export default Hero;
