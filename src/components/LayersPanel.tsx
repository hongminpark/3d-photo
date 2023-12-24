import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Layer = ({ layer, onToggle, onClick, isSelected }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className={`flex items-center justify-between px-2 py-1 ${
                isSelected ? "bg-blue-100" : ""
            } border ${
                isHovered ? "hover:border-blue-500" : "border-transparent"
            }  `}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center">
                <div className="w-8 h-8 mr-2 overflow-hidden flex items-center justify-center">
                    <img
                        src={layer.url}
                        alt="Layer Preview"
                        className="w-auto h-4 object-contain"
                    />
                </div>
                <span>{layer.name}</span>
            </div>
            {isHovered && (
                <div className="flex items-center gap-2">
                    {layer.visible ? (
                        <EyeIcon
                            className="h-3 w-3 hover:cursor-pointer"
                            onClick={onToggle}
                        />
                    ) : (
                        <EyeSlashIcon
                            className="h-3 w-3 hover:cursor-pointer"
                            onClick={onToggle}
                        />
                    )}
                    <button className="hover:text-gray-300">
                        <span>&#8942;</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default function LayersPanel({
    layers,
    setLayers,
    currentLayer,
    setCurrentLayer,
}) {
    const toggleVisibility = (index) => {
        setLayers((layers) =>
            layers.map((layer, i) =>
                i === index ? { ...layer, visible: !layer.visible } : layer
            )
        );
    };
    return (
        <div className="w-full">
            {layers.map((layer, index) => (
                <Layer
                    key={index}
                    layer={layer}
                    onToggle={() => toggleVisibility(index)}
                    onClick={() => setCurrentLayer(index)}
                    isSelected={currentLayer == index}
                />
            ))}
        </div>
    );
}
