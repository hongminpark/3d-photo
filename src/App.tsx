// src/App.jsx
import { useState } from "react";
import LayerControls from "./components/LayerControls";
import LayersPanel from "./components/LayersPanel";
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

    return (
        <div className="flex h-screen w-screen ">
            <div className="w-1/2 h-full bg-[#F5F5F5] flex flex-col text-black">
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
                        <LayerControls
                            currentLayer={currentLayer}
                            setLayers={setLayers}
                            layer={layers[currentLayer]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
