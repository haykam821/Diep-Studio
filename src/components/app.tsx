import React from "react";
import Scene from "./scene";
import Sidebar from "./sidebar";
import styled from "styled-components";

export type Config = Record<string, unknown>;

/**
 * Gets the saved config from local storage.
 * @returns The saved config.
 */
function getSavedConfig(): Config {
	try {
		const parsed = JSON.parse(localStorage.getItem("diep-studio:saved"));

		if (parsed === null) {
			return {};
		}
		return parsed;
	} catch (error) {
		/* eslint-disable-next-line no-console */
		console.warn("Saved config error:", error);
		return {};
	}
}

interface AppProps {
	className?: string;
}

type Tool = "pan";
interface AppState {
	config: Config;
	tool: Tool;
}

class AppUnstyled extends React.Component<AppProps, AppState> {
	constructor(props: Readonly<AppProps>) {
		super(props);

		this.state = {
			config: getSavedConfig(),
			tool: "pan",
		};

		this.changeConfig = this.changeConfig.bind(this);
	}

	changeConfig(key: string, value: unknown) {
		this.setState(state => {
			state.config[key] = value;
			return state;
		});
		localStorage.setItem("diep-studio:saved", JSON.stringify(this.state.config));
	}

	render() {
		return <div className={this.props.className}>
			<Sidebar config={this.state.config} changeConfig={this.changeConfig} />
			<Scene config={this.state.config} changeConfig={this.changeConfig} />
		</div>;
	}
}

const App = styled(AppUnstyled)`
	width: 100%;
	height: 100%;

	background: pink;
`;
export default App;
