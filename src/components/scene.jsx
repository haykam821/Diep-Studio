const React = require("react");
const styled = require("styled-components").default;

const CoordinatesDisplay = styled(class CoordinatesDisplay extends React.Component {
	render() {
		return <div className={this.props.className}>
			<div className="posDisplay">
				<span className="posLabel">X:</span>
				<span className="posVal">{this.props.x || 0}</span>
			</div>
			<div className="posDisplay">
				<span className="posLabel">Y:</span>
				<span className="posVal">{this.props.y || 0}</span>
			</div>
		</div>;
	}
})`
	position: absolute;
	bottom: 0px;
	right: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	font-family: 'Ubuntu';
	padding: 8px;
	border-top-left-radius: 8px;
	user-select: none;

	.posDisplay {
		min-width: 60px;
	}
	.posLabel {
		padding-right: 8px;
	}
	.posVal {
		float: right;
	}
`;

const Scene = styled(class Scene extends React.Component {
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

		const can = this.canvas.current;
		const ctx = can.getContext("2d");
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
		return <div className={this.props.className}>
			<canvas ref={this.canvas} width={window.innerWidth} height={window.innerHeight}></canvas>
			<CoordinatesDisplay x={this.state.mouseX} y={this.state.mouseY} />
		</div>;
	}
})``;
module.exports = Scene;