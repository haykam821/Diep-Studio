import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import chroma, { Color } from "chroma-js";

import { colorByProperty } from "../colors";
import styled from "styled-components";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	color: string;
	label: string;
}

interface ButtonState {
	active: boolean;
	hover: boolean;
}

class ButtonUnstyled extends React.Component<ButtonProps, ButtonState> {
	constructor(props: Readonly<ButtonProps>) {
		super(props);

		this.state = {
			active: false,
			hover: false,
		};

		this.setActive = this.setActive.bind(this);
		this.setInactive = this.setInactive.bind(this);
		this.setHover = this.setHover.bind(this);
		this.setCancel = this.setCancel.bind(this);
	}

	setActive() {
		this.setState({
			active: true,
		});
	}

	setInactive() {
		this.setState({
			active: false,
		});
	}

	setHover() {
		this.setState({
			hover: true,
		});
	}

	setCancel() {
		this.setState({
			active: false,
			hover: false,
		});
	}

	getGradColor(color: string | number | Color) {
		if (this.state.active) return chroma(color).brighten(0.67).hex();
		if (this.state.hover) return chroma(color).darken(0.67).hex();

		return "rgba(173, 173, 173, 1)";
	}

	render() {
		const color = (colorByProperty(this.props.color) || colorByProperty("teamBrown")).color;
		const gradColor = this.getGradColor(color);

		return <button {...this.props} className={this.props.className} onMouseDown={this.setActive} onMouseEnter={this.setHover} onMouseOut={this.setCancel} onMouseUp={this.setInactive} style={{
			backgroundColor: (this.state.hover || this.state.active) ? color : "#8B8B8B",
			backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, ${gradColor} 50%)`,
		}} >
			{this.props.label}
		</button>;
	}
}

const Button = styled(ButtonUnstyled)`
	border: 2px solid #333333;
	border-radius: 2px;
	color: white;
	display: inline-block;
	font-family: "Ubuntu";
	font-size: 11px;
	font-weight: 600;
	line-height: 15px;
	outline: none;
	padding: 1px;
	text-align: center;
	text-decoration: none;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, -1px -1px black, -1px 1px black, 1px 1px black, 1px -1px black;
	width: 100px;
`;
export default Button;
