function errorBoundary(component) {
	return class extends component {
		constructor(props) {
			super(props);

			if (!this.state) {
				this.state = {};
			}

			this.state.error = false;
		}

		static getDerivedStateFromError() {
			return {
				error: true,
			};
		}

		render() {
			if (this.state.error && this.renderError) {
				return this.renderError();
			} else {
				return super.render();
			}
		}
	}
}