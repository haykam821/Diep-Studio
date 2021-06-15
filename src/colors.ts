export const colorGroups = {
	bg: "Background",
	other: "Other",
	stat: "Stats",
	team: "Teams",
};
type ColorGroup = keyof typeof colorGroups;

interface Color {
	color: string;
	group: ColorGroup;
	id: string;
	name: string;
}

export const colors: Color[] = [{
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

/**
 * Gets a color by a given property.
 * @param {*} value The required property.
 * @param {string} property The property to search by.
 * @returns The found color.
 */
export function colorByProperty<K extends keyof Color>(value: Color[K], property?: K): Color | undefined {
	if (typeof property === "undefined") {
		return colors.find(color => color.id === value);
	} else {
		return colors.find(color => color[property] === value);
	}
}
