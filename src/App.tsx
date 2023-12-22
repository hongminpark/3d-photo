// src/App.jsx
import { useState } from "react";
import Scene from "./components/Scene";
import "./index.css";

function App() {
    const [postModel, setPostModel] = useState("WallMounted");
    const [shelfModel, setShelfModel] = useState("");
    const [distance, setDistance] = useState(0.902);

    return (
        <div className="flex h-screen w-screen ">
            <div className="w-1/2 h-full bg-gray-200 flex flex-col text-black">
                <div className="flex-1">
                    <Scene
                        postModel={postModel}
                        setPostModel={setPostModel}
                        shelfModel={shelfModel}
                        setShelfModel={setShelfModel}
                        distance={distance}
                        setDistance={setDistance}
                    />
                </div>
            </div>
            <div className="w-1/2 h-full overflow-y-auto">
                <div className="p-8 text-medium m-4 ">
                    <p className="font-bold text-lg">SELECT POST TYPE</p>
                    <div className="flex flex-row gap-4 my-4">
                        <button
                            className="py-2 px-4 border border-black box-border"
                            onClick={() => setPostModel("WallMounted")}
                        >
                            {"WALL MOUNTED"}
                        </button>
                        <button
                            className="py-2 px-4 border border-black box-border"
                            onClick={() => setPostModel("SemiWallMounted")}
                        >
                            {"SEMI WALL MOUNTED"}
                        </button>
                        <button
                            className="py-2 px-4 border border-black box-border"
                            onClick={() => setPostModel("Compressed")}
                        >
                            {"COMPRESSED"}
                        </button>
                    </div>
                </div>
                <div className="p-8 text-medium m-4 ">
                    <p className="font-bold text-lg">SELECT WIDTH</p>
                    <div className="flex flex-row gap-4 my-4">
                        <button
                            className="py-2 px-4 border border-black box-border"
                            onClick={() => setDistance(0.4)}
                        >
                            W400
                        </button>
                        <button
                            className=" py-2 px-4 border border-black box-border"
                            onClick={() => setDistance(0.902)}
                        >
                            W900
                        </button>
                    </div>
                </div>
                <div className="p-8 text-medium m-4 ">
                    <p className="font-bold text-lg">SELECT SHELF TYPE</p>
                    <div className="flex flex-row gap-4 my-4">
                        <button
                            className="py-2 px-4 border border-black box-border"
                            onClick={() => setShelfModel("Shelf")}
                        >
                            SHELF
                        </button>
                        <button
                            className="py-2 px-4 border border-black box-border"
                            onClick={() => setShelfModel("InclinedShelf")}
                        >
                            INCLINED SHELF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
