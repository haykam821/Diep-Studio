const React = require("react");
const styled = require("styled-components").default;

class SelectUnstyled extends React.Component {
	render() {
		return <select data-config={this.props.config} className={this.props.className}>
			{
				this.props.options.map(option => {
					return <option value={option[1]} key={option[1]}>
						{option[0]}
					</option>;
				})
			}
		</select>;
	}
}
SelectUnstyled.propTypes = {

};

const Select = styled(SelectUnstyled)``;
module.exports = Select;
