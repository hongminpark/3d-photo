import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import ImageObject from "./ImageObject";
import Loader from "./Loader";

const Scene = React.forwardRef(
    ({ layers, setLayers, currentLayer, setCurrentLayer }, ref) => {
        const cameraCenter = [0, 1.5, 0];

        function handleDragOver(e) {
            e.preventDefault();
        }

        function handleDrop(e) {
            e.preventDefault();

            if (e.dataTransfer.items) {
                for (let i = 0; i < e.dataTransfer.items.length; i++) {
                    if (e.dataTransfer.items[i].kind === "file") {
                        let file = e.dataTransfer.items[i].getAsFile();
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            setLayers((prevLayers) => [
                                ...prevLayers,
                                {
                                    name: file.name,
                                    url: e.target.result,
                                    position: [0, 0, 0],
                                    scale: 1,
                                    rotation: [0, 0, 0],
                                    visible: true,
                                },
                            ]);
                        };
                        reader.readAsDataURL(file);
                    }
                }
            } else {
                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    // Process the files similarly as above
                }
            }
        }
        return (
            <div
                ref={ref}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                }}
                onClick={() => setCurrentLayer(null)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
                    <OrthographicCamera
                        makeDefault
                        position={[0, 3, 5]}
                        zoom={200}
                        onUpdate={(self) => self.lookAt(...cameraCenter)}
                    />
                    <Suspense fallback={<Loader />}></Suspense>
                    {/* {!isDragging && <OrbitControls target={cameraCenter} />} */}
                    {layers.map(
                        (layer, index) =>
                            layer.visible && (
                                <ImageObject
                                    key={index}
                                    layer={layer}
                                    renderOrder={index}
                                    isSelected={index === currentLayer}
                                />
                            )
                    )}
                </Canvas>
            </div>
        );
    }
);
export default Scene;
