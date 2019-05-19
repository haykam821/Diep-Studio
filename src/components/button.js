const React = require("react");
const elem = React.createElement;

const chroma = require("chroma-js");

const { colorByProp } = require("./colorpicker.js");

class Button extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = {
			hover: false,
			active: false,
		};
	}

	render() {
		const color = (colorByProp(this.props.color) || colorByProp("teamBrown")).color;
		const lightened = chroma(color).brighten(0.67).hex();
		const activeLightened = chroma(color).darken(0.67).hex();
		const gradColor = this.state.active ? activeLightened : (this.state.hover ? lightened : "rgba(173, 173, 173, 1)");

		return elem("button", {
			...this.props,
			style: {
				backgroundColor: (this.state.hover || this.state.active) ? color : "#8B8B8B",
				backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, ${gradColor} 50%)`,
				border: "2px solid #333333",
				borderRadius: "2px",
				color: "white",
				width: "100px",
				lineHeight: "15px",
				textAlign: "center",
				fontFamily: "Ubuntu",
				textDecoration: "none",
				textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, -1px -1px black, -1px 1px black, 1px 1px black, 1px -1px black",
				display: "inline-block",
				fontSize: "11px",
				fontWeight: 600,
				padding: "1px",
				outline: "none",
				...this.props.style,
			},
			children: this.props.label,
			onMouseDown: () => {
				this.setState({
					active: true,
				});
			},
			onMouseUp: () => {
				this.setState({
					active: false,
				});
			},
			onMouseOut: () => {
				this.setState({
					active: false,
					hover: false,
				});
			},
			onMouseEnter: () => {
				this.setState({
					hover: true,
				});
			},
		});
	}
}
module.exports = Button;