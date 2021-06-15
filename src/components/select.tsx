import React from "react";
import styled from "styled-components";

type Option = [string, string];

interface SelectProps {
	className?: string;
	config: string;
	options: Option[];
}

class SelectUnstyled extends React.Component<SelectProps> {
	render() {
		return <select data-config={this.props.config} className={this.props.className}>
			{
				this.props.options.map(option => {
					return <option value={option[1]} key={option[1]}>
						{option[0]}
					</option>;
				})
			}
		</select>;
	}
}

const Select = styled(SelectUnstyled)``;
export default Select;
