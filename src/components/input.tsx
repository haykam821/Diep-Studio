import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import formStyles from "../form-styles";
import styled from "styled-components";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	config: string;
}

class InputUnstyled extends React.Component<InputProps> {
	render() {
		return <input className={this.props.className} data-config={this.props.config} {...this.props} />;
	}
}

const Input = styled(InputUnstyled)`
	${formStyles as never}
	padding: ${props => props.type === "color" ? 0 : 2};
`;
export default Input;
