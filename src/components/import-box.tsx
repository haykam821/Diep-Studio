import React, { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from "react";

import styled from "styled-components";

interface ImportBoxProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	value: string;
}

interface ImportBoxState {
	validJSON: boolean;
	value: string;
}

class ImportBoxUnstyled extends React.Component<ImportBoxProps, ImportBoxState> {
	constructor(props: Readonly<ImportBoxProps>) {
		super(props);

		this.state = {
			validJSON: true,
			value: this.props.value,
		};

		this.validate = this.validate.bind(this);
	}

	validate(event: ChangeEvent<HTMLTextAreaElement>) {
		try {
			const parsed = JSON.parse(event.target.value);
			this.setState({
				validJSON: !Array.isArray(parsed),
			});
		} catch (error) {
			this.setState({
				validJSON: false,
			});
		}
	}

	render() {
		return <textarea {...this.props} autoCapitalize="off" autoComplete="off" autoCorrect="off" onChange={this.validate} rows={8} spellCheck={false} style={{
			color: this.state.validJSON ? "black" : "red",
		}} value={this.state.value} />;
	}
}

const ImportBox = styled(ImportBoxUnstyled)`
	font-family: 'Ubuntu Mono', monospace;
`;
export default ImportBox;
