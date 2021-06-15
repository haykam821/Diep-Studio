import React, { RefObject } from "react";

import { Config } from "./app";
import Coordinates from "./coordinates";
import styled from "styled-components";

interface SceneProps {
	config: Config;
	changeConfig: (key: string, value: unknown) => void;
	className?: string;
}

interface SceneState {
	camX: number;
	camY: number;
	mouseX: number;
	mouseY: number;
	zoom: number;
}

class SceneUnstyled extends React.Component<SceneProps, SceneState> {
	private readonly canvas: RefObject<HTMLCanvasElement>;

	constructor(props: Readonly<SceneProps>) {
		super(props);

		this.canvas = React.createRef();
		this.state = {
			camX: 0,
			camY: 0,
			mouseX: null,
			mouseY: null,
			zoom: 1,
		};

		this.updateCoordinates = this.updateCoordinates.bind(this);
	}

	componentDidMount() {
		window.addEventListener("mousemove", this.updateCoordinates);
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.updateCoordinates);
	}

	updateCoordinates(event: MouseEvent) {
		this.setState({
			mouseX: Math.round((event.clientX - this.canvas.current.offsetLeft) * (1 / this.state.zoom) + this.state.camX),
			mouseY: Math.round((event.clientY - this.canvas.current.offsetTop) * (1 / this.state.zoom) + this.state.camY),
		});
	}

	render() {
		return <div className={this.props.className}>
			<canvas ref={this.canvas} width={window.innerWidth} height={window.innerHeight}></canvas>
			<Coordinates x={this.state.mouseX} y={this.state.mouseY} />
		</div>;
	}
}

const Scene = styled(SceneUnstyled)``;
export default Scene;
