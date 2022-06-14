import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "typeface-heebo"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();