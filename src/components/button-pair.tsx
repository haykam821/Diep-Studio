import React, { ReactNode } from "react";
import styled from "styled-components";

interface ButtonPairProps {
	children: ReactNode;
	className?: string;
}

class ButtonPairUnstyled extends React.Component<ButtonPairProps> {
	render() {
		return <div className={this.props.className}>
			{this.props.children}
		</div>;
	}
}

const ButtonPair = styled(ButtonPairUnstyled)`
	display: flex;

	& > * {
		flex-grow: 100;
		margin: 2px;
		padding: 3px;
	}
`;
export default ButtonPair;
