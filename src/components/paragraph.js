const React = require("react");
const elem = React.createElement;

const errorBoundary = require("./../hoc/error-boundary.js");

const Paragraph = errorBoundary(class extends React.Component {
	render() {
		return elem("p", {
			children: this.state.error ? "Oh no! An error occurred!" : this.props.text,
			style: {
				color: this.state.error ? "#ff9699" : "white",
				fontSize: this.props.size || 16,
				margin: 5,
				textAlign: "center",
				...this.props.style,
			},
		});
	}
});
module.exports = Paragraph;