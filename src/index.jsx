require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");
require("file-loader?name=[name].[ext]!./index.css");

const React = require("react");
const ReactDOM = require("react-dom");

const Sidebar = require("./sidebar.jsx");
const { DebugMenu } = require("./debug.jsx");
const Scene = require("./components/scene.jsx");

const loading = document.querySelector("#loading");
window.addEventListener("load", () => {
	loading.style.opacity = 0;
	setTimeout(() => {
		loading.remove();
	}, 1000);
});

class App extends React.Component {
	render() {
		return <React.Fragment>
			<Sidebar />
			<DebugMenu render={render} />
			<Scene />
		</React.Fragment>;
	}
}

function render() {
	ReactDOM.render(<App />, document.getElementById("app"));
}
render();