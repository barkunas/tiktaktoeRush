import { configureStore } from "@reduxjs/toolkit";

import GameCounterReducer from "./GameCounterReducer"
import GamePageReducer from "./GamePageReducer"

export default configureStore({
    reducer: {
        counter: GameCounterReducer,
        page: GamePageReducer
    },
});