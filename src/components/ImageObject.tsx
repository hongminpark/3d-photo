import { useAspect } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { PlaneGeometry, TextureLoader } from "three";

export default function ImageObject({
    layer,
    setIsDragging,
    renderOrder,
    isSelected,
    setCurrentLayer,
}) {
    const texture = useLoader(TextureLoader, layer.url);
    const [imageWidth, imageHeight] = useAspect(
        texture.image.width,
        texture.image.height
    );
    const aspectScale = [
        (imageWidth / 10) * layer.scale,
        (imageHeight / 10) * layer.scale,
        1,
    ];
    const meshRef = useRef();

    return (
        <mesh
            ref={meshRef}
            position={layer.position}
            rotation={layer.rotation}
            scale={aspectScale}
            onClick={setCurrentLayer}
            renderOrder={renderOrder}
        >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                map={texture}
                transparent={true}
                depthTest={false}
            />
            {isSelected && (
                <lineSegments>
                    <edgesGeometry
                        attach="geometry"
                        args={[new PlaneGeometry(1, 1)]}
                    />
                    <lineBasicMaterial attach="material" color="blue" />
                </lineSegments>
            )}
        </mesh>
    );
}
