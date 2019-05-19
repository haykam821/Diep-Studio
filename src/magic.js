window.elem = React.createElement;

function transitionValue(thing) {
	if (thing.state && thing.state.value) {
		return thing.state.value;
	} else {
		return thing.value;
	}
}
window.transitionVal = transitionValue;

window.formStyles = {
	backgroundColor: 0xF8F8F8,
	color: 0x000000,
	resize: "none",
	lineHeight: "14px",
	fontSize: 12,
	fontFamily: [
		"Ubuntu",
		"sans-serif",
	],
	fontWeight: "normal",
	border: "2px solid black",
	borderRadius: 3,
	userSelect: "text",
	outline: "none",
	margin: 0.5,
};

window.cornerStyles = {
	position: "absolute",
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	color: 0xFFFFFF,
	fontFamily: "Ubuntu",
	padding: 8,
	userSelect: "none",
};

window.configProps = {};