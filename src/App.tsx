// src/App.jsx
import { useState } from "react";
import Scene from "./components/Scene";
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

    const handlePositionChange = (axis, value) => {
        if (currentLayer !== undefined) {
            setLayers((prevLayers) => {
                const updatedLayers = [...prevLayers];
                updatedLayers[currentLayer].position = [
                    ...updatedLayers[currentLayer].position,
                ];
                updatedLayers[currentLayer].position[axis] = value;
                return updatedLayers;
            });
        }
    };

    const handleScaleChange = (value) => {
        if (currentLayer !== undefined) {
            setLayers((prevLayers) => {
                const updatedLayers = [...prevLayers];
                updatedLayers[currentLayer].scale = value;
                return updatedLayers;
            });
        }
    };

    const handleRotationChange = (axis, value) => {
        if (currentLayer !== undefined) {
            setLayers((prevLayers) => {
                const updatedLayers = [...prevLayers];
                updatedLayers[currentLayer].rotation = [
                    ...updatedLayers[currentLayer].rotation,
                ];
                updatedLayers[currentLayer].rotation[axis] = value;
                return updatedLayers;
            });
        }
    };
    return (
        <div className="flex h-screen w-screen ">
            <div className="w-1/2 h-full bg-gray-200 flex flex-col text-black">
                <div className="flex-1">
                    <Scene
                        layers={layers}
                        currentLayer={currentLayer}
                        setCurrentLayer={setCurrentLayer}
                    />
                </div>
            </div>
            <div className="w-1/2 h-full overflow-y-auto">
                <div className="p-8 text-medium m-4 ">
                    <p className="font-bold text-lg">SELECT POST TYPE</p>
                    <div className="flex flex-row gap-4 my-4">
                        <LayersPanel
                            layers={layers}
                            setLayers={setLayers}
                            setCurrentLayer={setCurrentLayer}
                        />
                    </div>
                </div>
                {layers[currentLayer] && (
                    <div className="p-8 text-medium m-4 flex flex-col gap-2">
                        <div>MOVE</div>
                        <div className="flex flex-row gap-4">
                            <span>X</span>
                            <input
                                className="w-full"
                                type="range"
                                min="-5"
                                max="5"
                                step="0.1"
                                value={layers[currentLayer].position[0]}
                                onChange={(e) =>
                                    handlePositionChange(
                                        0,
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-row gap-4">
                            <span>Y</span>
                            <input
                                className="w-full"
                                type="range"
                                min="-5"
                                max="5"
                                step="0.1"
                                value={layers[currentLayer].position[1]}
                                onChange={(e) =>
                                    handlePositionChange(
                                        1,
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div>SCALE</div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={layers[currentLayer].scale}
                            onChange={(e) =>
                                handleScaleChange(parseFloat(e.target.value))
                            }
                        />
                        <div>ROTATE</div>
                        <div className="flex flex-row gap-4">
                            <span>X</span>
                            <input
                                className="w-full"
                                type="range"
                                min="-5"
                                max="5"
                                step="0.1"
                                value={layers[currentLayer].rotation[0]}
                                onChange={(e) =>
                                    handleRotationChange(
                                        0,
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-row gap-4">
                            <span>Y</span>
                            <input
                                className="w-full"
                                type="range"
                                min="-5"
                                max="5"
                                step="0.1"
                                value={layers[currentLayer].rotation[1]}
                                onChange={(e) =>
                                    handleRotationChange(
                                        1,
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-row gap-4">
                            <span>Z</span>
                            <input
                                className="w-full"
                                type="range"
                                min={`${-Math.PI * 2}`}
                                max={`${Math.PI * 2}`}
                                step="0.1"
                                value={layers[currentLayer].rotation[2]}
                                onChange={(e) =>
                                    handleRotationChange(
                                        2,
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

const Layer = ({ layer, onToggle, onClick }) => {
    return (
        <div
            className="flex items-center justify-between p-2 border border-black "
            onClick={onClick}
        >
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={layer.visible}
                    onChange={onToggle}
                />
                <div className="w-8 h-8 mr-2 overflow-hidden ">
                    <img
                        src={layer.url}
                        alt="Layer Preview"
                        className="w-full h-full object-contain"
                    />
                </div>
                <span>{layer.url}</span>
            </div>
            <button className="hover:text-gray-300">
                <span>&#8942;</span>
            </button>
        </div>
    );
};

// Layers panel component
const LayersPanel = ({ layers, setLayers, setCurrentLayer }) => {
    const toggleVisibility = (index) => {
        setLayers((layers) =>
            layers.map((layer, i) =>
                i === index ? { ...layer, visible: !layer.visible } : layer
            )
        );
    };
    return (
        <div className="w-48">
            {layers.map((layer, index) => (
                <Layer
                    key={index}
                    layer={layer}
                    onToggle={() => toggleVisibility(index)}
                    onClick={() => setCurrentLayer(index)}
                />
            ))}
        </div>
    );
};
