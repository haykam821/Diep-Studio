require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");
require("file-loader?name=[name].[ext]!./index.css");

const React = require("react");
const elem = React.createElement;

const ReactDOM = require("react-dom");

const Sidebar = require("./sidebar.js");
const { DebugMenu } = require("./debug.js");

const loading = document.querySelector("#loading");
window.addEventListener("load", () => {
	loading.style.opacity = 0;
	setTimeout(() => {
		loading.remove();
	}, 1000);
});

function render() {
	ReactDOM.render(elem(React.Fragment, null, [
		// Elem(Sidebar),
		elem(DebugMenu),
	]), document.getElementById("app"));
}
render();
module.exports = render;