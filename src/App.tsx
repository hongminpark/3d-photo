// src/App.jsx
import { useState } from "react";
import LayerControls from "./components/LayerControls";
import LayersPanel from "./components/LayersPanel";
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

    return (
        <div className="flex h-screen w-screen text-xs text-neutral-900">
            <div className="w-3/4 h-full bg-[#F5F5F5] flex flex-col text-black">
                <div className="flex-1">
                    <Scene
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
                        <LayersPanel
                            layers={layers}
                            setLayers={setLayers}
                            currentLayer={currentLayer}
                            setCurrentLayer={setCurrentLayer}
                        />
                    </div>
                </div>
                {layers[currentLayer] && (
                    <div className="text-medium m-4 flex flex-col gap-2">
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
