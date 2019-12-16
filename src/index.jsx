require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");
require("file-loader?name=[name].[ext]!./index.css");

const React = require("react");
React.__spread = Object.assign;
const ReactDOM = require("react-dom");

const App = require("./components/app.jsx");

// Remove loading screen
const loading = document.getElementById("loading");
loading.remove();
setTimeout(() => {

}, 0);

ReactDOM.render(<App />, document.getElementById("app"));