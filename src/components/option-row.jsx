const React = require("react");
const styled = require("styled-components").default;

/**
 * Truncates a string to a given length.
 * @param {string} text The text to truncate.
 * @param {string} limit The maximum length.
 * @param {string} truncator The string to use to indicate truncated text.
 * @returns The truncated text.
 */
function truncate(text, limit = 20, truncator = "...") {
	if (text.length - truncator.length <= limit) {
		return text;
	} else {
		return text.slice(0, limit) + truncator;
	}
}

class OptionRowUnstyled extends React.Component {
	render() {
		const control = React.cloneElement(this.props.children, {
			className: "control",
		});

		return <div className={this.props.className}>
			<span className="label">
				{truncate(this.props.label + ":", 11)}
			</span>
			{control}
		</div>;
	}
}
OptionRowUnstyled.propTypes = {

};

const OptionRow = styled(OptionRowUnstyled)`
	display: flex;

	.label {
		white-space: nowrap;
	}
	.control {
		display: inline-flex;
		flex-grow: 100;
		margin-left: 8px;
	}
`;
module.exports = OptionRow;
