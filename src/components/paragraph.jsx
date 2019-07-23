const React = require("react");
const errorBoundary = require("../hoc/error-boundary.js");

const Paragraph = errorBoundary(class Paragraph extends React.Component {
	render() {
		return <p style={{
			color: this.state.error ? "#ff9699" : "white",
			fontSize: this.props.size || 16,
			margin: 5,
			textAlign: "center",
			...this.props.style,
		}}>
			{this.state.error ? "Oh no! An error occurred!" : this.props.text || this.props.children}
		</p>;
	}
});
module.exports = Paragraph;