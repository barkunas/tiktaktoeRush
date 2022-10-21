import { configureStore } from "@reduxjs/toolkit";

import GameCounterReducer from "./GameCounterReducer"
import GamePageReducer from "./GamePageReducer"
import Model3DReducer from "./Model3DReducer";
import ClickTilesBlockerReducer from "./ClickTilesBlockerReducer";
import ItemsQueueReducer from "./ItemsQueueReducer";

export default configureStore({
    reducer: {
        counter: GameCounterReducer,
        page: GamePageReducer,
        model: Model3DReducer,
        clickTilesBlocker: ClickTilesBlockerReducer,
        itemsQueue: ItemsQueueReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});