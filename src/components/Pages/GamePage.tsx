import { OrbitControls } from "@react-three/drei";
import { GameUI } from "../Helpers/GameUi";
import { TopPanel } from "../InGame/TopPanel";
import { Game } from "../InGame/Game";

export function GamePage() {
    return (
        <>
            <OrbitControls makeDefault
                           enablePan={true}
                           enableZoom={true}
                           autoRotate={false}
                           minPolarAngle={Math.PI / 4}
                           maxPolarAngle={Math.PI / 1}/>
            <GameUI>
                <TopPanel/>
            </GameUI>
            <Game/>
        </>
    )
}