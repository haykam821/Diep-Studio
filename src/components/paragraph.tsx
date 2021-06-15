import React, { ReactNode } from "react";
import styled from "styled-components";

interface ParagraphProps {
	children: ReactNode;
	className?: string;
	size?: number;
}

class ParagraphUnstyled extends React.Component<ParagraphProps> {
	render() {
		return <p className={this.props.className}>
			{this.props.children}
		</p>;
	}
}

const Paragraph = styled(ParagraphUnstyled)`
	color: white;
	font-size: ${props => props.size || 16};
	margin: 5px;
	text-align: center;
`;
export default Paragraph;
