const configProps = {};
module.exports.configProps = configProps;

const config = new Proxy({}, {
	set: (object, property, value) => {
		const relatedProperty = configProps[property];
		if (relatedProperty) {
			relatedProperty.setState({
				source: "configUpdate",
				value,
			});
		}

		object[property] = value;
		return true;
	},
});
module.exports.config = config;