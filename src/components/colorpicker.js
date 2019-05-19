const React = require("react");
const elem = React.createElement;

const configInput = require("./../hoc/configinput.js");
const errorBoundary = require("./../hoc/error-boundary.js");

const ButtonPair = require("./buttonpair.js");
const Input = require("./input.js");

const colorGroups = {
	team: "Teams",
	other: "Other",
	bg: "Background",
	stat: "Stats",
};
const colors = [{
	id: "teamBlue",
	name: "Blue Team",
	color: "#00b0e1",
	group: "team",
}, {
	id: "teamRed",
	name: "Red Team",
	color: "#f04f54",
	group: "team",
}, {
	id: "teamGreen",
	name: "Green Team",
	color: "#00e06c",
	group: "team",
}, {
	id: "teamPurple",
	name: "Purple Team",
	color: "#be7ff5",
	group: "team",
}, {
	id: "teamBrown",
	name: "Brown Team",
	color: "#D48067",
	group: "other",
}, {
	id: "barrel",
	name: "Barrel",
	color: "#999999",
	group: "other",
}, {
	id: "outline",
	name: "Outline",
	color: "#525252",
	group: "other",
}, {
	id: "background",
	name: "Background",
	color: "#cdcdcd",
	group: "bg",
}, {
	id: "gridLine",
	name: "Grid Line",
	color: "#c0c0c0",
	group: "bg",
}, {
	id: "statHealthRegen",
	name: "Health Regen",
	color: "#e8b18a",
	group: "stat",
}, {
	id: "statMaxHealth",
	name: "Max Health",
	color: "#e666ea",
	group: "stat",
}, {
	id: "statBodyDamage",
	name: "Body Damage",
	color: "#9566ea",
	group: "stat",
}, {
	id: "statBulletSpeed",
	name: "Bullet Speed",
	color: "#6690ea",
	group: "stat",
}, {
	id: "statBulletPenetration",
	name: "Bullet Penetration",
	color: "#e7d063",
	group: "stat",
}, {
	id: "statBulletDamage",
	name: "Bullet Damage",
	color: "#ea6666",
	group: "stat",
}, {
	id: "statReload",
	name: "Reload",
	color: "#92ea66",
	group: "stat",
}, {
	id: "statMovementSpeed",
	name: "Movement Speed",
	color: "#66eae6",
	group: "stat",
}];

function colorByProperty(value, property = "id") {
	return colors.find(color => color[property] === value);
}

const ColorPicker = errorBoundary(configInput(class extends React.Component {
	renderColorPicker() {
		return elem(Input, {
			type: "color",
			value: this.state.value,
			name: this.props.name,
			onChange: event => {
				this.setState({
					value: event.target.value,
					source: "pickerUpdate",
				});
			},
			style: {
				marginRight: 0,
			},
		});
	}

	render() {
		const valueColor = colorByProperty(this.state.value, "color");
		const diepSelect = elem("select", {
			onChange: event => {
				const color = colorByProperty(event.target.value);
				if (color) {
					this.setState({
						value: color.color,
						source: "selectUpdate",
					});
				}
			},
			children: Object.entries(colorGroups).map(colorGroup => {
				return elem("optgroup", {
					label: colorGroup[1],
					children: colors.filter(color => {
						return color.group === colorGroup[0];
					}).map(color => {
						return elem("option", {
							value: color.id,
							children: color.name,
						});
					}),
				});
			}).concat(elem("option", {
				value: "custom",
				children: "Custom",
			})),
			value: valueColor ? valueColor.id : "custom",
			style: {
				marginLeft: 0,
			},
		});

		return elem(ButtonPair, {
			children: [
				diepSelect,
				this.renderColorPicker(),
			],
			...this.props.style,
		});
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