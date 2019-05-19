function configInput(component) {
	return class extends component {
		constructor(props) {
			super(props);
			this.state = {
				value: this.props.value,
				source: null,
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
	}	
}
module.exports = configInput;