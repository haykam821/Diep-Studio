const React = require("react");
const styled = require("styled-components").default;

const Coordinates = require("./coordinates.jsx");

class SceneUnstyled extends React.Component {
	constructor(props) {
		super(props);

		this.canvas = React.createRef();
		this.state = {
			camX: 0,
			camY: 0,
			mouseX: null,
			mouseY: null,
			zoom: 1,
		};

		this.updateCoordinates = this.updateCoordinates.bind(this);
	}

	componentDidMount() {
		window.addEventListener("mousemove", this.updateCoordinates);
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.updateCoordinates);
	}

	updateCoordinates(event) {
		this.setState({
			mouseX: Math.round((event.clientX - this.canvas.current.offsetLeft) * (1 / this.state.zoom) + this.state.camX),
			mouseY: Math.round((event.clientY - this.canvas.current.offsetTop) * (1 / this.state.zoom) + this.state.camY),
		});
	}

	render() {
		return <div>
			<canvas ref={this.canvas} width={window.innerWidth} height={window.innerHeight}></canvas>
			<Coordinates x={this.state.mouseX} y={this.state.mouseY} />
		</div>;
	}
}
SceneUnstyled.propTypes = {

};

const Scene = styled(SceneUnstyled)``;
module.exports = Scene;
