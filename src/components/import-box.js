const React = require("react");
const elem = React.createElement;

class ImportBox extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = {
			valid: true,
		};
	}

	render() {
		return elem("textarea", {
			autocapitalize: "off",
			autocomplete: "off",
			autocorrect: "off",
			onChange: event => {
				try {
					const parsed = JSON.parse(event.target.value);
					this.setState({
						valid: !Array.isArray(parsed),
					});
				} catch (error) {
					this.setState({
						valid: false,
					});
				}
			},
			rows: 8,
			spellcheck: false,
			...this.props,
			style: {
				color: this.state.valid ? "black" : "red",
				fontFamily: [
					"Ubuntu Mono",
					"monospace",
				],
			},
			value: this.props.value || this.state.value,
		});
	}
}
module.exports = ImportBox;