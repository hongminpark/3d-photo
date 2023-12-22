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
            renderOrder: 0,
            visible: true,
        },
        {
            name: "Layer 5",
            url: "/5.png",
            position: [0, 1, 0],
            scale: 1,
            renderOrder: 1,
            visible: true,
        },
        {
            name: "Layer 4",
            url: "/4.png",
            position: [0, 1.6, 0],
            scale: 1,
            renderOrder: 2,
            visible: true,
        },
    ]);

    return (
        <div className="flex h-screen w-screen ">
            <div className="w-1/2 h-full bg-gray-200 flex flex-col text-black">
                <div className="flex-1">
                    <Scene layers={layers} />
                </div>
            </div>
            <div className="w-1/2 h-full overflow-y-auto">
                <div className="p-8 text-medium m-4 ">
                    <p className="font-bold text-lg">SELECT POST TYPE</p>
                    <div className="flex flex-row gap-4 my-4">
                        <LayersPanel layers={layers} setLayers={setLayers} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

const Layer = ({ layer, onToggle }) => {
    return (
        <div className="flex items-center justify-between p-2 border border-black ">
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
const LayersPanel = ({ layers, setLayers }) => {
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
                />
            ))}
        </div>
    );
};
