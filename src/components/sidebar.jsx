/* eslint-disable no-undef */

const React = require("react");
const styled = require("styled-components").default;

const Paragraph = require("./paragraph.jsx");
const ConfigField = require("./config-field.jsx");
const SidebarSection = require("./sidebar-section.jsx");
const ImportBox = require("./import-box.jsx");
const ButtonPair = require("./button-pair.jsx");
const Button = require("./button.jsx");
const OptionRow = require("./option-row.jsx");
const Input = require("./input.jsx");
const ColorPicker = require("./color-picker.jsx");
const Select = require("./select.jsx");

const Icon = require("./icon.jsx");
const { faReddit, faGithub, faDiscord } = require("@fortawesome/free-brands-svg-icons");

class SidebarUnstyled extends React.Component {
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
							const boxValue = document.querySelector("#dataBox").value;
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
							document.querySelector("#dataBox").value = output;
							localStorage.setItem("saved", output);
						}} title="Saves and exports as JSON." />
					</ButtonPair>
					<ButtonPair>
						<Button color="statBulletDamage" label="Clear" onClick={() => setValues()} title="This will remove all progress on the current scene!" />
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
SidebarUnstyled.propTypes = {

};

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
module.exports = Sidebar;
