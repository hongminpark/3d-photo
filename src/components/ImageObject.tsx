import { PivotControls, useAspect } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader } from "three";

export default function ImageObject({
    url,
    position,
    scale = 1,
    setIsDragging,
    renderOrder,
}) {
    const texture = useLoader(TextureLoader, url);
    const [imageWidth, imageHeight] = useAspect(
        texture.image.width,
        texture.image.height
    );
    const aspectScale = [
        (imageWidth / 10) * scale,
        (imageHeight / 10) * scale,
        1,
    ];
    const meshRef = useRef();
    const pivotRef = useRef();
    const [controlsVisible, setControlsVisible] = useState(false);

    // Event handler for click
    const onImageClick = (e) => {
        e.stopPropagation();
        setControlsVisible(!controlsVisible); // Toggle visibility of PivotControls
    };

    return (
        <>
            <PivotControls
                ref={pivotRef}
                rotation={[0, -Math.PI / 2, Math.PI / 2]}
                anchor={[1, -1, -1]}
                scale={75}
                depthTest={false}
                fixed
                lineWidth={2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                visible={controlsVisible}
            >
                <mesh
                    ref={meshRef}
                    position={position}
                    scale={aspectScale}
                    onClick={onImageClick}
                    renderOrder={renderOrder}
                >
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent={true}
                        depthTest={false}
                    />
                </mesh>
            </PivotControls>
        </>
    );
}
