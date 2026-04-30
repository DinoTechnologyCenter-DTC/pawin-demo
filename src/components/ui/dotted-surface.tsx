'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { resolvedTheme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		animationId: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 120;
		const AMOUNTX = 50;
		const AMOUNTY = 50;

		const scene = new THREE.Scene();
		
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 500, 1000);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		containerRef.current.appendChild(renderer.domElement);

		// Material based on theme
		const isDark = resolvedTheme === 'dark';
		const particleColor = isDark ? 0xffffff : 0x000000;

		const numParticles = AMOUNTX * AMOUNTY;
		const positions = new Float32Array(numParticles * 3);
		const scales = new Float32Array(numParticles);

		let i = 0, j = 0;
		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				positions[i + 1] = 0;
				positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
				scales[j] = 1;
				i += 3;
				j++;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

		const material = new THREE.PointsMaterial({
			color: particleColor,
			size: 2.5,
			transparent: true,
			opacity: isDark ? 0.2 : 0.1,
		});

		const particles = new THREE.Points(geometry, material);
		scene.add(particles);

		let count = 0;
		const animate = () => {
			const animId = requestAnimationFrame(animate);
			const positions = geometry.attributes.position.array as Float32Array;
			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50) +
						(Math.sin((iy + count) * 0.5) * 50);
					i += 3;
				}
			}
			geometry.attributes.position.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.1;
			
			if (sceneRef.current) {
				sceneRef.current.animationId = animId;
			}
		};

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);
		animate();

		sceneRef.current = {
			scene,
			camera,
			renderer,
			animationId: 0,
		};

		return () => {
			window.removeEventListener('resize', handleResize);
			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);
				scene.remove(particles);
				geometry.dispose();
				material.dispose();
				renderer.dispose();
				if (containerRef.current) {
					containerRef.current.innerHTML = '';
				}
			}
		};
	}, [resolvedTheme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 -z-0 opacity-40', className)}
			{...props}
		/>
	);
}
