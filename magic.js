const elem = React.createElement;

function transitionVal(thing) {
	if (thing.state && thing.state.value) {
		return thing.state.value;
	} else {
		return thing.value;
	}
}

const formStyles = {
	backgroundColor: 0xf8f8f8,
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

const configProps = {};