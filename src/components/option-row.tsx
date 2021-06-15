import React from "react";
import styled from "styled-components";

/**
 * Truncates a string to a given length.
 * @param text The text to truncate.
 * @param limit The maximum length.
 * @param truncator The string to use to indicate truncated text.
 * @returns The truncated text.
 */
function truncate(text: string, limit = 20, truncator = "..."): string {
	if (text.length - truncator.length <= limit) {
		return text;
	} else {
		return text.slice(0, limit) + truncator;
	}
}

interface OptionRowProps {
	children: JSX.Element;
	className?: string;
	label: string;
}

class OptionRowUnstyled extends React.Component<OptionRowProps> {
	render() {
		const control = React.cloneElement(this.props.children, {
			className: "control",
		});

		return <div className={this.props.className}>
			<span className="label">
				{truncate(this.props.label + ":", 11)}
			</span>
			{control}
		</div>;
	}
}

const OptionRow = styled(OptionRowUnstyled)`
	display: flex;

	.label {
		white-space: nowrap;
	}
	.control {
		display: inline-flex;
		flex-grow: 100;
		margin-left: 8px;
	}
`;
export default OptionRow;
