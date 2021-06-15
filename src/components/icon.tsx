import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

interface IconProps {
	link?: string;
	title?: string;
	className?: string;
	size?: SizeProp;
	icon: IconProp;
}

class IconUnstyled extends React.Component<IconProps> {
	render() {
		return <a href={this.props.link} title={this.props.title} className={this.props.className}>
			<FontAwesomeIcon size={this.props.size} icon={this.props.icon} />
		</a>;
	}
}

const Icon = styled(IconUnstyled)`
	color: white;
	font-size: 25px;
	padding: 3px;
	text-decoration: none;
	transition: 0.2s;
`;
export default Icon;
