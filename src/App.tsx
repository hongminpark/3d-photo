// src/App.jsx
import imglyRemoveBackground from "@imgly/background-removal";
import { useCallback, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import LayerControls from "./components/LayerControls";
import LayerList from "./components/LayersPanel";
import Scene from "./components/Scene";
import "./custom.css";
import "./index.css";

function App() {
    const [layers, setLayers] = useState([
        {
            name: "Layer 6",
            url: "/6.png",
            position: [0, 0.4, 0],
            scale: 1.15,
            rotation: [0, 0, 0],
            visible: true,
        },
        {
            name: "Layer 5",
            url: "/5.png",
            position: [0, 1, 0],
            scale: 1,
            rotation: [0, 0, 0],
            visible: true,
        },
        {
            name: "Layer 4",
            url: "/4.png",
            position: [0, 1.6, 0],
            scale: 1,
            rotation: [0, 0, 0],
            visible: true,
        },
    ]);

    const [currentLayer, setCurrentLayer] = useState();
    const sceneRef = useRef();
    const [isRemovingBackground, setIsRemovingBackground] = useState(false);

    const removeBackground = () => {
        setIsRemovingBackground(true); // Show the loading indicator
        let imageSrc = layers[currentLayer].url;
        imglyRemoveBackground(imageSrc).then((blob: Blob) => {
            const url = URL.createObjectURL(blob);
            const newLayers = layers.map((layer, index) => {
                if (index === currentLayer) {
                    return { ...layer, url };
                }
                return layer;
            });
            setLayers(newLayers);
            setIsRemovingBackground(false); // Hide the loading indicator
        });
    };

    const takeSnapshot = useCallback(() => {
        const canvas = sceneRef.current.querySelector("canvas");
        if (canvas) {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "scene-snapshot.png";
            link.href = image;
            link.click();
        }
    }, [sceneRef]);

    return (
        <div className="flex h-screen w-screen text-xs text-neutral-900">
            <div className="w-3/4 h-full bg-[#F5F5F5] flex flex-col text-black">
                <div className="flex-1">
                    <Scene
                        ref={sceneRef}
                        layers={layers}
                        setLayers={setLayers}
                        currentLayer={currentLayer}
                        setCurrentLayer={setCurrentLayer}
                    />
                </div>
            </div>
            <div className="w-1/4 h-full overflow-y-auto">
                <div className="text-medium">
                    <div className="flex flex-row gap-4">
                        <LayerList
                            layers={layers}
                            setLayers={setLayers}
                            currentLayer={currentLayer}
                            setCurrentLayer={setCurrentLayer}
                        />
                    </div>
                </div>
                {layers[currentLayer] && (
                    <div className="text-medium p-4 flex flex-col gap-2">
                        <LayerControls
                            currentLayer={currentLayer}
                            setLayers={setLayers}
                            layer={layers[currentLayer]}
                        />
                        <div className="relative w-max m-4">
                            {isRemovingBackground && (
                                <div
                                    role="status"
                                    className="absolute inset-0 flex justify-center items-center"
                                >
                                    <LoadingSpinner />
                                </div>
                            )}
                            <button
                                className={`w-max m-4 py-2 px-4 border border-black box-border ${
                                    isRemovingBackground ? "opacity-30" : ""
                                }`}
                                onClick={removeBackground}
                            >
                                {"Remove background"}
                            </button>
                        </div>
                    </div>
                )}
                <div className="w-max p-4">
                    <button
                        className="py-2 px-4 border border-black box-border"
                        onClick={takeSnapshot}
                    >
                        {"export"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
