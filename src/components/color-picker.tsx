import React, { ChangeEvent } from "react";
import { colorByProperty, colorGroups, colors } from "../colors";

import ButtonPair from "./button-pair";
import Input from "./input";
import styled from "styled-components";

interface ColorPickerProps {
	config: string;
	className: string;
	value: string;
}

interface ColorPickerState {
	value: string;
}

class ColorPickerUnstyled extends React.Component<ColorPickerProps, ColorPickerState> {
	public static readonly defaultProps: Partial<ColorPickerProps> = {
		value: "#00b0e1",
	};

	constructor(props: Readonly<ColorPickerProps>) {
		super(props);

		this.state = {
			value: this.props.value,
		};

		this.setColorName = this.setColorName.bind(this);
		this.setColor = this.setColor.bind(this);
	}

	setColorName(event: ChangeEvent<HTMLSelectElement>) {
		const color = colorByProperty(event.target.value);
		if (color) {
			this.setState({
				value: color.color,
			});
		}
	}

	setColor(event: ChangeEvent<HTMLInputElement>) {
		this.setState({
			value: event.target.value,
		});
	}

	render() {
		const valueColor = colorByProperty(this.state.value, "color");

		const selectOptions = [
			...Object.entries(colorGroups).map(colorGroup => {
				return <optgroup label={colorGroup[1]} key={colorGroup[0]}>
					{colors.filter(color => {
						return color.group === colorGroup[0];
					}).map(color => {
						return <option value={color.id} key={color.id}>
							{color.name}
						</option>;
					})}
				</optgroup>;
			}),
			<option value="custom" key="custom">
				Custom
			</option>,
		];

		return <div className={this.props.className}>
			<ButtonPair>
				<select value={valueColor ? valueColor.id : "custom"} onChange={this.setColorName} >
					{selectOptions}
				</select>
				<Input config={this.props.config} type="color" value={this.state.value} onChange={this.setColor} />
			</ButtonPair>
		</div>;
	}
}

const ColorPicker = styled(ColorPickerUnstyled)`
	& > ${Input} {
		margin-right: 0;
	}
`;
export default ColorPicker;
