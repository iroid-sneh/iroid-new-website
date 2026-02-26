"use client";
import * as THREE from "three";
import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Text3D, Center, Environment, Float } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const BrandIcon = ({
    url,
    scale = 1,
    position = [0, 0, 0],
}: {
    url: string;
    scale: number;
    position: [number, number, number];
}) => {
    const svgData = useLoader(SVGLoader, url);
    const shapes = useMemo(() => {
        return svgData.paths.flatMap((path) => path.toShapes(true));
    }, [svgData]);

    return (
        <group position={position} rotation={[Math.PI, 0, 0]} scale={scale}>
            {shapes.map((shape, index) => (
                <mesh key={index}>
                    <extrudeGeometry
                        args={[
                            shape,
                            {
                                depth: 2,
                                bevelEnabled: true,
                                bevelThickness: 0.5,
                                bevelSize: 0.5,
                            },
                        ]}
                    />
                    {/* Pure White 3D Material */}
                    <meshStandardMaterial
                        color="white"
                        roughness={0.1}
                        metalness={0.1}
                    />
                </mesh>
            ))}
        </group>
    );
};

function LogoText() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Very subtle mouse tilt for that "Premium" feel
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            (state.mouse.x * Math.PI) / 20,
            0.05
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            (state.mouse.y * Math.PI) / 30,
            0.05
        );
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                {/* TOP LINE: QUALITY (With Apple Logo) */}
                <Center top position={[0, -2, 0]}>
                    <group>
                        <BrandIcon
                            url="/media/ios.svg"
                            scale={0.005}
                            position={[-4, 1.5, 0]}
                        />
                        <Text3D
                            font="/fonts/retail_black.json"
                            size={1}
                            height={0.1}
                            letterSpacing={-0.05}
                            bevelEnabled
                            bevelSize={0.02}
                            bevelThickness={0.02}
                        >
                            {`UALITY`}
                            <meshStandardMaterial color="white" />
                        </Text3D>
                    </group>
                </Center>

                {/* BOTTOM LINE: MATTERS. (With Android R) */}
                <Center top position={[0, -3, 0]}>
                    <group>
                        <Text3D
                            font="/fonts/retail_black.json"
                            size={1}
                            height={0.1}
                            letterSpacing={-0.05}
                            bevelEnabled
                            bevelSize={0.02}
                            bevelThickness={0.02}
                        >
                            {`MATTE  S.`}
                            <meshStandardMaterial color="white" />
                        </Text3D>
                        <BrandIcon
                            url="/media/R.svg"
                            scale={0.005}
                            position={[4, 1.5, 0]}
                        />
                    </group>
                </Center>
            </Float>
        </group>
    );
}

export default function Experience() {
    return (
        <Canvas
            /* Pulling camera back (z: 12) so the massive text fits the screen */
            camera={{ position: [0, 0, 12], fov: 35 }}
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                <color attach="background" args={["#000014"]} />

                {/* High intensity lights to make the White pop */}
                <ambientLight intensity={0.8} />
                <pointLight
                    position={[10, 10, 10]}
                    intensity={2}
                    color="white"
                />
                <spotLight
                    position={[-10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={2}
                />

                <LogoText />

                <Environment preset="night" />
            </Suspense>
        </Canvas>
    );
}
