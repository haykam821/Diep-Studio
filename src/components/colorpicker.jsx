const React = require("react");

const configInput = require("../hoc/configinput.js");
const errorBoundary = require("../hoc/error-boundary.js");

const ButtonPair = require("./buttonpair.jsx");
const Input = require("./input.jsx");

const colorGroups = {
	bg: "Background",
	other: "Other",
	stat: "Stats",
	team: "Teams",
};
const colors = [{
	color: "#00b0e1",
	group: "team",
	id: "teamBlue",
	name: "Blue Team",
}, {
	color: "#f04f54",
	group: "team",
	id: "teamRed",
	name: "Red Team",
}, {
	color: "#00e06c",
	group: "team",
	id: "teamGreen",
	name: "Green Team",
}, {
	color: "#be7ff5",
	group: "team",
	id: "teamPurple",
	name: "Purple Team",
}, {
	color: "#D48067",
	group: "other",
	id: "teamBrown",
	name: "Brown Team",
}, {
	color: "#999999",
	group: "other",
	id: "barrel",
	name: "Barrel",
}, {
	color: "#525252",
	group: "other",
	id: "outline",
	name: "Outline",
}, {
	color: "#cdcdcd",
	group: "bg",
	id: "background",
	name: "Background",
}, {
	color: "#c0c0c0",
	group: "bg",
	id: "gridLine",
	name: "Grid Line",
}, {
	color: "#e8b18a",
	group: "stat",
	id: "statHealthRegen",
	name: "Health Regen",
}, {
	color: "#e666ea",
	group: "stat",
	id: "statMaxHealth",
	name: "Max Health",
}, {
	color: "#9566ea",
	group: "stat",
	id: "statBodyDamage",
	name: "Body Damage",
}, {
	color: "#6690ea",
	group: "stat",
	id: "statBulletSpeed",
	name: "Bullet Speed",
}, {
	color: "#e7d063",
	group: "stat",
	id: "statBulletPenetration",
	name: "Bullet Penetration",
}, {
	color: "#ea6666",
	group: "stat",
	id: "statBulletDamage",
	name: "Bullet Damage",
}, {
	color: "#92ea66",
	group: "stat",
	id: "statReload",
	name: "Reload",
}, {
	color: "#66eae6",
	group: "stat",
	id: "statMovementSpeed",
	name: "Movement Speed",
}];

function colorByProperty(value, property = "id") {
	return colors.find(color => color[property] === value);
}

const ColorPicker = errorBoundary(configInput(class ColorPicker extends React.Component {
	renderColorPicker() {
		return <Input name={this.props.name} onChange={event => {
			this.setState({
				source: "pickerUpdate",
				value: event.target.value,
			});
		}} style={{
			marginRight: 0,
		}} type="color" value={this.state.value} />;
	}

	render() {
		const valueColor = colorByProperty(this.state.value, "color");
		const diepSelect = <select onChange={event => {
			const color = colorByProperty(event.target.value);
			if (color) {
				this.setState({
					source: "selectUpdate",
					value: color.color,
				});
			}
		}} style={{ marginLeft: 0 }} value={valueColor ? valueColor.id : "custom"} >
			{Object.entries(colorGroups).map(colorGroup => {
				return <optgroup label={colorGroup[1]} key={colorGroup[0]}>
					{colors.filter(color => {
						return color.group === colorGroup[0];
					}).map(color => {
						return <option value={color.id} key={color.id}>
							{color.name}
						</option>;
					})}
				</optgroup>;
			}).concat(<option value="custom" key="custom">
				Custom
			</option>)}
		</select>;

		return <ButtonPair {...this.props.style}>
			{diepSelect}
			{this.renderColorPicker()}
		</ButtonPair>;
	}

	renderError() {
		// We assume the error was caused by the select
		return this.renderColorPicker();
	}
}));
ColorPicker.defaultProps = {
	value: "#00b0e1",
};
module.exports = ColorPicker;
module.exports.colorByProp = colorByProperty;