const React = require("react");
const styled = require("styled-components").default;

class ImportBoxUnstyled extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			validJSON: true,
		};

		this.validate = this.validate.bind(this);
	}

	validate(event) {
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
	}

	render() {
		return <textarea {...this.props} autoCapitalize="off" autoComplete="off" autoCorrect="off" onChange={this.validate} rows={8} spellCheck={false} style={{
			color: this.state.valid ? "black" : "red",
		}} value={this.props.value || this.state.value} />;
	}
}
ImportBoxUnstyled.propTypes = {

};

const ImportBox = styled(ImportBoxUnstyled)`
	font-family: 'Ubuntu Mono', monospace;
`;
module.exports = ImportBox;
