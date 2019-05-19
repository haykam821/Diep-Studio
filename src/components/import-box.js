class ImportBox extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = {
			valid: true,
		};
	}

	render() {
		return elem("textarea", {
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

			autocomplete: "off",
			autocorrect: "off",
			autocapitalize: "off",
			spellcheck: false,

			...this.props,
			value: this.props.value || this.state.value,
			style: {
				color: this.state.valid ? "black" : "red",
				fontFamily: [
					"Ubuntu Mono",
					"monospace",
				],
			},
		});
	}
}
module.exports = ImportBox;