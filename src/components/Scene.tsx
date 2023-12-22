import {
    OrbitControls,
    OrthographicCamera,
    PivotControls,
    useAspect,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { TextureLoader } from "three";
import Loader from "./Loader";

export default function Scene({
    postModel,
    setPostModel,
    shelfModel,
    setShelfModel,
    distance,
    setDistance,
}) {
    const cameraCenter = [0, 1.5, 0];
    const ref = useRef();
    const [isDragging, setIsDragging] = useState(false);
    return (
        <div
            ref={ref}
            // className="p-8"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            }}
        >
            <Canvas shadows>
                <OrthographicCamera
                    makeDefault
                    position={[0, 3, 5]}
                    zoom={200}
                    onUpdate={(self) => self.lookAt(...cameraCenter)}
                />
                <color attach="background" args={["#ffffff"]} />
                <Suspense fallback={<Loader />}></Suspense>
                {!isDragging && <OrbitControls target={cameraCenter} />}
                <MyImageComponent
                    url="/5.png"
                    position={[0, 1.6, 0]}
                    scale={1}
                    setIsDragging={setIsDragging}
                    renderOrder={2}
                />
                <MyImageComponent
                    url="/4.png"
                    position={[0, 1, 0]}
                    scale={1}
                    setIsDragging={setIsDragging}
                    renderOrder={1}
                />
                <MyImageComponent
                    url="/6.png"
                    position={[0, 0.4, 0]}
                    scale={1.15}
                    setIsDragging={setIsDragging}
                    renderOrder={0}
                />
            </Canvas>
        </div>
    );
}

const MyImageComponent = ({
    url,
    position,
    scale = 1,
    setIsDragging,
    renderOrder,
}) => {
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
};
