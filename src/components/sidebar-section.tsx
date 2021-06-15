import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Icon from "./icon";
import Paragraph from "./paragraph";
import React from "react";
import styled from "styled-components";

interface SidebarSectionProps {
	className?: string;
	description?: string;
	header: string;
}

interface SidebarSectionState {
	expanded: boolean;
}

class SidebarSectionUnstyled extends React.Component<SidebarSectionProps, SidebarSectionState> {
	constructor(props: Readonly<SidebarSectionProps>) {
		super(props);

		this.state = {
			expanded: true,
		};

		this.toggleExpansion = this.toggleExpansion.bind(this);
	}

	toggleExpansion(): void {
		this.setState({
			expanded: !this.state.expanded,
		});
	}

	render() {
		return <div className={this.props.className}>
			<div className="header">
				<button onClick={this.toggleExpansion} >
					<Icon icon={this.state.expanded ? faAngleDown : faAngleRight} />
				</button>
				<h2>
					{this.props.header}
				</h2>
			</div>
			{this.state.expanded && <div>
				{this.props.description && <Paragraph>
					{this.props.description}
				</Paragraph>}
				<div>
					{this.props.children}
				</div>
			</div>}
		</div>;
	}
}

const SidebarSection = styled(SidebarSectionUnstyled)`
	.header {
		text-align: center;

		button {
			background: none;
			border: none;
			color: white;
			font-size: 18px;
			height: initial;
			outline: none;
			padding: 5px;
			width: initial;
		}

		h2 {
			display: inline-block;
			margin-bottom: 5px;
		}
	}
`;
export default SidebarSection;
