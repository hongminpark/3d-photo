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
    setLayers,
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
    const handleSize = 0.05; // Size of the corner squares
    const handleHover = (e, hoverState) => {
        e.stopPropagation();
        document.body.style.cursor = hoverState ? "nwse-resize" : "auto"; // 'nwse-resize' is the typical cursor for resizing
    };

    const createHandle = (position) => (
        <mesh
            position={position}
            onPointerOver={(e) => handleHover(e, true)}
            onPointerOut={(e) => handleHover(e, false)}
        >
            <boxGeometry args={[handleSize, handleSize, handleSize]} />
            <meshBasicMaterial color="#0A99FF" />
        </mesh>
    );

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
                <>
                    <lineSegments>
                        <edgesGeometry
                            attach="geometry"
                            args={[new PlaneGeometry(1, 1)]}
                        />
                        <lineBasicMaterial attach="material" color="#0A99FF" />
                    </lineSegments>
                    {/* Create handles at each corner */}
                    {createHandle([0.5, 0.5, 0])}
                    {createHandle([-0.5, 0.5, 0])}
                    {createHandle([-0.5, -0.5, 0])}
                    {createHandle([0.5, -0.5, 0])}
                </>
            )}
        </mesh>
    );
}
