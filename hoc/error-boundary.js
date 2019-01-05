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

		componentDidCatch(error) {
			if (this.renderError) {
				console.warn("An error that could be caught by the boundary occurred:", error);
			} else {
				console.error("An uncaught error occurred:", error);
			}
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