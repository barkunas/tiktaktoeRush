import { configureStore } from "@reduxjs/toolkit";

import GameCounterReducer from "./GameCounterReducer"
import GamePageReducer from "./GamePageReducer"
import Model3DReducer from "./Model3DReducer";
import ClickTilesBlockerReducer from "./ClickTilesBlockerReducer";

export default configureStore({
    reducer: {
        counter: GameCounterReducer,
        page: GamePageReducer,
        model: Model3DReducer,
        clickTilesBlocker: ClickTilesBlockerReducer
    },
});