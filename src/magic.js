const React = require("react");

window.elem = React.createElement;

function transitionValue(thing) {
	if (thing.state && thing.state.value) {
		return thing.state.value;
	} else {
		return thing.value;
	}
}
window.transitionVal = transitionValue;