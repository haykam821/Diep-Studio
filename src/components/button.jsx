const React = require("react");

const chroma = require("chroma-js");

const { colorByProp } = require("./colorpicker.jsx");

class Button extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = {
			active: false,
			hover: false,
		};
	}

	render() {
		const color = (colorByProp(this.props.color) || colorByProp("teamBrown")).color;
		const lightened = chroma(color).brighten(0.67).hex();
		const activeLightened = chroma(color).darken(0.67).hex();

		/* eslint-disable-next-line no-nested-ternary */
		const gradColor = this.state.active ? activeLightened : (this.state.hover ? lightened : "rgba(173, 173, 173, 1)");

		return <button {...this.props} onMouseDown={() => {
			this.setState({
				active: true,
			});
		}} onMouseEnter={() => {
			this.setState({
				hover: true,
			});
		}} onMouseOut={() => {
			this.setState({
				active: false,
				hover: false,
			});
		}} onMouseUp={() => {
			this.setState({
				active: false,
			});
		}} style={{
			backgroundColor: (this.state.hover || this.state.active) ? color : "#8B8B8B",
			backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, ${gradColor} 50%)`,
			border: "2px solid #333333",
			borderRadius: "2px",
			color: "white",
			display: "inline-block",
			fontFamily: "Ubuntu",
			fontSize: "11px",
			fontWeight: 600,
			lineHeight: "15px",
			outline: "none",
			padding: "1px",
			textAlign: "center",
			textDecoration: "none",
			textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, -1px -1px black, -1px 1px black, 1px 1px black, 1px -1px black",
			width: "100px",
			...this.props.style,
		}} >
			{this.props.label}
		</button>;
	}
}
module.exports = Button;