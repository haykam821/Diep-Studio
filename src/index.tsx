require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");
require("file-loader?name=[name].[ext]!./index.css");

import App from "./components/app";
import React from "react";
import ReactDOM from "react-dom";

// Remove loading screen
const loading = document.getElementById("loading");
loading.remove();

ReactDOM.render(<App />, document.getElementById("app"));
