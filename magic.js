const elem = React.createElement;

function transitionVal(thing) {
	if (thing.state && thing.state.value) {
		return thing.state.value;
	} else {
		return thing.value;
	}
}

const configProps = {};