import React from "react";
import styled from "styled-components";

interface CoordinatesProps {
	className?: string;
	x?: number;
	y?: number;
}

class CoordinatesUnstyled extends React.Component<CoordinatesProps> {
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
export default Coordinates;
