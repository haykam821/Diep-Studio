const React = require("react");
const styled = require("styled-components").default;

class CoordinatesUnstyled extends React.Component {
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
}
CoordinatesUnstyled.propTypes = {

};

const Coordinates = styled(CoordinatesUnstyled)`
	position: absolute;
	bottom: 0px;
	right: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	font-family: 'Ubuntu';
	padding: 8px;
	border-top-left-radius: 8px;
	user-select: none;

	@media (max-width: 1000px) and (orientation: portrait) {
		bottom: unset;
		top: 0;

		border-top-left-radius: 0;
		border-bottom-left-radius: 8px;
	}

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
module.exports = Coordinates;