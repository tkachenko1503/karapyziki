import babelPolyfill from "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { match, Router } from "react-router";
import { createHistory } from "history";

import api from "../api";
import routes from "./routes";
import Connect from "./utils/Connect";

let newHistory = createHistory();
let initialData = window.__PAGE_STATE__;

ReactDOM.render(
    (
        <Connect pageData={ initialData }>
            <Router history={ newHistory }>{ routes }</Router>
        </Connect>
    ),
    document.getElementById("app"));
