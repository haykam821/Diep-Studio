import React, { CSSProperties, ChangeEvent } from "react";
import styled from "styled-components";

interface ConfigFieldProps {
	changeConfig: (key: string, value: unknown) => void;
	className?: string;
	style?: CSSProperties;
}

class ConfigFieldUnstyled extends React.Component<ConfigFieldProps> {
	constructor(props: Readonly<ConfigFieldProps>) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
	}

	getParsedInput(target: EventTarget): unknown {
		if ("value" in target) {
			const element = target as unknown as Record<string, unknown>;
			if ("type" in target && element.type === "number") {
				return parseInt(element.value as string);
			}
		}
		return undefined;
	}

	handleInput(event: ChangeEvent<HTMLDivElement>) {
		const config = event.target.dataset.config;
		if (config) {
			const parsed = this.getParsedInput(event.target);
			this.props.changeConfig(config, parsed);
		}
	}

	render() {
		return <div className={this.props.className} onChange={this.handleInput} style={this.props.style}>
			{this.props.children}
		</div>;
	}
}

const ConfigField = styled(ConfigFieldUnstyled)``;
export default ConfigField;
