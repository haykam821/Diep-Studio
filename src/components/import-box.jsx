const React = require("react");

class ImportBox extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = {
			valid: true,
		};
	}

	render() {
		return <textarea autoCapitalize="off" autoComplete="off" autoCorrect="off" onChange={event => {
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
		}} rows={8} spellCheck={false} {...this.props} style={{
			color: this.state.valid ? "black" : "red",
			fontFamily: [
				"Ubuntu Mono",
				"monospace",
			],
		}} value={this.props.value || this.state.value} />;
	}
}
module.exports = ImportBox;