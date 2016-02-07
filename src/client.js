import React from "react";
import ReactDOM from "react-dom";
import { match, Router } from "react-router";
import { createHistory } from 'history'

import routes from "./routes";

let newHistory = createHistory();

ReactDOM.render(<Router history={ newHistory }>{ routes }</Router>, document);
