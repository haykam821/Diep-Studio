require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");
require("file-loader?name=[name].[ext]!./index.css");

const React = require("react");
const ReactDOM = require("react-dom");

const Sidebar = require("./sidebar.js");
const { DebugMenu } = require("./debug.jsx");

const loading = document.querySelector("#loading");
window.addEventListener("load", () => {
	loading.style.opacity = 0;
	setTimeout(() => {
		loading.remove();
	}, 1000);
});

class Canvas extends React.Component {
	render() {
		return <canvas style={{
			height: "100%",
			width: "100%",
		}}></canvas>;
	}
}

function render() {
	ReactDOM.render(<React.Fragment>
		<DebugMenu render={render} />
		<Canvas />
	</React.Fragment>, document.getElementById("app"));
}
render();