const React = require("react");
const errorBoundary = require("../hoc/error-boundary.js");

const Icon = errorBoundary(class Icon extends React.Component {
	render() {
		return <a href={this.props.link} target="_blank" title={this.props.title} style={{
			color: "white",
			fontSize: 25,
			padding: 3,
			textDecoration: "none",
			transition: "0.2s",
		}}>
			<i className={"fab " + (this.state.error ? "exclamation-triangle" : this.props.icon)}></i>
		</a>;
	}
});
module.exports = Icon;