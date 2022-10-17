import { useSelector } from "react-redux";
import { Pages, selectPage } from "../../redux/GamePageReducer";
import { GamePage } from "../Pages/GamePage";
import { MainMenuPage } from "../Pages/MainMenuPage";

export function App() {
    const page = useSelector(selectPage)
    switch (page.value) {
        case Pages.Menu:
            return <MainMenuPage/>
        case Pages.InGame:
            return <GamePage/>
        default:
            return <MainMenuPage/>

    }
}

