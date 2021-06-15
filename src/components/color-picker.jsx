const React = require("react");
const styled = require("styled-components").default;

const ButtonPair = require("./button-pair.jsx");
const Input = require("./input.jsx");

const { colorByProperty, colorGroups, colors } = require("../colors.js");

class ColorPickerUnstyled extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
		};

		this.setColorName = this.setColorName.bind(this);
		this.setColor = this.setColor.bind(this);
	}

	setColorName(event) {
		const color = colorByProperty(event.target.value);
		if (color) {
			this.setState({
				value: color.color,
			});
		}
	}

	setColor(event) {
		this.setState({
			value: event.target.value,
		});
	}

	render() {
		const valueColor = colorByProperty(this.state.value, "color");

		const selectOptions = [
			...Object.entries(colorGroups).map(colorGroup => {
				return <optgroup label={colorGroup[1]} key={colorGroup[0]}>
					{colors.filter(color => {
						return color.group === colorGroup[0];
					}).map(color => {
						return <option value={color.id} key={color.id}>
							{color.name}
						</option>;
					})}
				</optgroup>;
			}),
			<option value="custom" key="custom">
				Custom
			</option>,
		];

		return <div className={this.props.className}>
			<ButtonPair>
				<select value={valueColor ? valueColor.id : "custom"} onChange={this.setColorName} >
					{selectOptions}
				</select>
				<Input config={this.props.config} type="color" value={this.state.value} onChange={this.setColor} />
			</ButtonPair>
		</div>;
	}
}
ColorPickerUnstyled.defaultProps = {
	value: "#00b0e1",
};
ColorPickerUnstyled.propTypes = {

};

const ColorPicker = styled(ColorPickerUnstyled)`
	& > ${Input} {
		margin-right: 0;
	}
`;
module.exports = ColorPicker;
