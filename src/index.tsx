import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { RootState } from '@react-three/fiber'
import { App } from "./components/App/App";
import { CustomCanvas } from "./components/Canvas/CustomCanvas";
import store from "./redux/Store"
import { Provider } from "react-redux";

const root = document.getElementById('root') as HTMLElement;
const reactRoot = ReactDOM.createRoot(root)

function onCreatedCanvas(state: RootState) {
    const renderer = state.gl;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xccccff);
}

// Render entry point
reactRoot.render(
    <Provider store={store}>
        <div style={{position: "relative", width: "100%", height: "100%"}}>
            <CustomCanvas onCreated={onCreatedCanvas} dpr={window.devicePixelRatio}>
                <App/>
            </CustomCanvas>
        </div>
    </Provider>
);

reportWebVitals();
