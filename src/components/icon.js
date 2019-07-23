const React = require("react");
const elem = React.createElement;

const errorBoundary = require("./../hoc/error-boundary.js");

const Icon = errorBoundary(class extends React.Component {
	render() {
		return elem("a", {
			children: elem("i", {
				class: "fab " + (this.state.error ? "exclamation-triangle" : this.props.icon),
			}),
			href: this.props.link,
			style: {
				color: "white",
				fontSize: 25,
				padding: 3,
				textDecoration: "none",
				transition: "0.2s",
			},
			target: "_blank",
			title: this.props.title,
		});
	}
});
module.exports = Icon;