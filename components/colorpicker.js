const colorGroups = {
	team: "Teams",
	other: "Other",
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
}];

function colorByProp(val, prop = "id") {
	return colors.find(color => color[prop] === val);
}

const ColorPicker = configInput(class extends React.Component {
	render() {
		const valColor = colorByProp(this.state.value, "color");
		const diepSelect = elem("select", {
			onChange: event => {
				const color = colorByProp(event.target.value);
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
			value: valColor ? valColor.id : "custom",
		});

		const colorPicker = elem("input", {
			type: "color",
			value: this.state.value,
			onChange: event => {
				this.setState({
					value: event.target.value,
					source: "pickerUpdate",
				});
			}
		});

		return React.createElement(ButtonPair, {
			children: [
				diepSelect,
				colorPicker,
			],
		});
	}
});
ColorPicker.defaultProps = {
	value: "#00b0e1",
};