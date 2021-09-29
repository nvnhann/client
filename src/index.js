import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Store/store";
import {SnackbarProvider} from "notistack";

ReactDOM.render(
    <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </SnackbarProvider>
    ,
    document.getElementById("root")
);
