const { configProps, config } = require("./../utils/config.js");

function configInput(component) {
	return class extends component {
		constructor(properties) {
			super(properties);
			this.state = {
				source: null,
				value: this.props.value,
			};

			if (this.props.config) {
				configProps[this.props.config] = this;
			}
		}

		setState(newState) {
			if (newState.source !== "configUpdate") {
				config[this.props.config] = newState.value;
			}
			return super.setState(newState);
		}
	};
}
module.exports = configInput;