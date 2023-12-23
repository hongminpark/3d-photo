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

export default function LayersPanel({ layers, setLayers, setCurrentLayer }) {
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
}
