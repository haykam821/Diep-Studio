/* eslint-disable no-undef */

import { faDiscord, faGithub, faReddit } from "@fortawesome/free-brands-svg-icons";

import Button from "./button";
import ButtonPair from "./button-pair";
import ColorPicker from "./color-picker";
import { Config } from "./app";
import ConfigField from "./config-field";
import Icon from "./icon";
import ImportBox from "./import-box";
import Input from "./input";
import OptionRow from "./option-row";
import Paragraph from "./paragraph";
import React from "react";
import Select from "./select";
import SidebarSection from "./sidebar-section";
import styled from "styled-components";

interface SidebarProps {
	config: Config;
	changeConfig: (key: string, value: unknown) => void;
	className?: string;
}

/**
 * Unimplemented
 * @param values Values
 */
function setValues(values: Config) {
	throw new Error("Not implemented: " + values);
}

/**
 * Unimplemented
 * @param title Title
 * @param description Description
 */
function notify(title: string, description: string) {
	throw new Error("Not implemented: " + title + ", " + description);
}

/**
 * Unimplemented
 */
function setCamValues() {
	throw new Error("Not implemented");
}

/**
 * Unimplemented
 * @param zoom Zoom
 */
function setZoom(zoom: number) {
	throw new Error("Not implemented: " + zoom);
}

/**
 * Unimplemented
 * @param tool Tool
 */
function setTool(tool: string) {
	throw new Error("Not implemented: " + tool);
}

class SidebarUnstyled extends React.Component<SidebarProps> {
	render() {
		return <div className={this.props.className}>
			<h1 className="title">
				Diep Studio
			</h1>
			<Paragraph>
				Welcome to Diep Studio! It is currently in beta; please send haykam any questions or concerns you may have. Thanks!
			</Paragraph>

			<ConfigField changeConfig={this.props.changeConfig} style={{ margin: 12 }}>
				<SidebarSection header="Manage">
					<ImportBox id="dataBox" placeholder="Paste your scene here" value={JSON.stringify(this.props.config, null, "\t")} />
					<ButtonPair>
						<Button color="statBulletSpeed" id="import" label="Import" onClick={() => {
							const boxValue = (document.querySelector("#dataBox") as HTMLTextAreaElement).value;
							if (boxValue) {
								try {
									setValues(JSON.parse(boxValue));
								} catch (_) {
									notify("Import", "Your Diep Studio code is broken.");
								}
							}
						}} title="Imports a Diep Studio or DSM scene." />
						<Button color="statBulletSpeed" id="importSaved" label="Import Saved" title="This will replace the current scene with the one you last saved." />
					</ButtonPair>
					<ButtonPair>
						<Button color="statReload" label="Save & Export" onClick={() => {
							const output = JSON.stringify(this.props.config);
							(document.querySelector("#dataBox") as HTMLTextAreaElement).value = output;
							localStorage.setItem("saved", output);
						}} title="Saves and exports as JSON." />
					</ButtonPair>
					<ButtonPair>
						<Button color="statBulletDamage" label="Clear" onClick={() => setValues({})} title="This will remove all progress on the current scene!" />
					</ButtonPair>
				</SidebarSection>
				<SidebarSection header="Camera">
					<ButtonPair>
						<Button color="statBulletDamage" label="Go to Center" onClick={() => setCamValues()} />
					</ButtonPair>
					<ButtonPair>
						<Button color="statBulletSpeed" label="Zoom Out" onClick={() => setZoom(-1)} />
						<Button color="statBulletSpeed" label="Zoom In" onClick={() => setZoom(1)} />
					</ButtonPair>
				</SidebarSection>
				<SidebarSection header="Toolbox" description="You can use the digit keys to easily switch between the first 10 tools." >
					<select id="toolSelect" onChange={event => setTool(event.target.value)}></select>
				</SidebarSection>
				<SidebarSection header="Grid Settings">
					<OptionRow label="Grid Size">
						<Input config="gridSize" min={2} type="number" />
					</OptionRow>
					<OptionRow label="Line Size">
						<Input config="gridLineWidth" min={1} type="number" />
					</OptionRow>
					<OptionRow label="Grid Background">
						<ColorPicker config="backgroundColor" />
					</OptionRow>
					<OptionRow label="Grid Color">
						<ColorPicker config="gridLineColor" />
					</OptionRow>
				</SidebarSection>
				<SidebarSection header="Border Settings">
					<OptionRow label="Border Style">
						<Select config="borderStyle" options={[
							["Diep.io", "newDiep"],
							["Old Diep.io (single color)", "oldDiep"],
							["Arras.io (this may be wrong)", "arras"],
						]} />
					</OptionRow>
				</SidebarSection>
			</ConfigField>
			<div className="social">
				<Icon icon={faReddit} link="https://www.reddit.com/r/DiepStudio/" title="Reddit" />
				<Icon icon={faGithub} link="https://github.com/haykam821/Diep-Studio" title="GitHub" />
				<Icon icon={faDiscord} link="https://discord.gg/5yDRQdf" title="Discord" />
			</div>
		</div>;
	}
}

const Sidebar = styled(SidebarUnstyled)`
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	font-family: "Ubuntu";
	height: 100%;
	left: 0;
	min-width: 232px;
	overflow-x: hidden;
	overflow-y: auto;
	position: absolute;
	top: 0;
	user-select: none;
	width: 20%;

	.title {
		margin-bottom: 5px;
		text-align: center;
	}

	.social {
		bottom: 10px;
		left: 0;
		margin-left: auto;
		margin-right: auto;
		padding-top: 30px;
		position: relative;
		right: 0;
		text-align: center;
	}
`;
export default Sidebar;
