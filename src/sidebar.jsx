const React = require("react");

const Paragraph = require("./components/paragraph.js");
const SidebarSection = require("./components/sidebar-section.js");
const ImportBox = require("./components/import-box.js");
const ButtonPair = require("./components/buttonpair.js");
const Button = require("./components/button.js");
const OptionRow = require("./components/optionrow.js");
const Input = require("./components/input.js");
const ColorPicker = require("./components/colorpicker.js");
const Select = require("./components/select.js");
const Icon = require("./components/icon.js");

const { notify } = require("./notifications.js");
const { setValues, setCamValues, setZoom, setTool } = require("./index.jsx");

const { config } = require("./utils/config.js");

class Sidebar extends React.Component {
	render() {
		return <div style={{
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			color: "white",
			fontFamily: "Ubuntu",
			height: "100%",
			left: 0,
			minWidth: 232,
			overflowX: "hidden",
			overflowY: "auto",
			position: "absolute",
			top: 0,
			userSelect: "none",
			width: "20%",
		}}>
			<h1 style={{
				marginBottom: 5,
				textAlign: "center",
			}}>
				Diep Studio
			</h1>
			<Paragraph>
				Welcome to Diep Studio! It is currently in beta; please send haykam any questions or concerns you may have. Thanks!
			</Paragraph>
			<div onInput={event => {
				if (event.target.id.startsWith("config-")) {
					const configId = event.target.id.replace("config-", "");
					config[configId] = event.target.value;
				}
			}} style={{ margin: 12 }} >
				<SidebarSection header="Manage">
					<ImportBox id="dataBox" placeholder="Paste your scene here" />
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
						<Button color="statBulletSpeed" id="importSaved" label="Import Saved" onClick={() => { }} title="This will replace the current scene with the one you last saved." />
					</ButtonPair>
					<ButtonPair>
						<Button color="statReload" label="Save & Export" onClick={() => {
							const output = JSON.stringify(config);
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
					<OptionRow label="Grid Size" control={<Input config="gridSize" min={2} type="number" />} />
					<OptionRow label="Line Size" control={<Input config="gridLineWidth" min={1} type="number" />} />
					<OptionRow label="Grid Background" control={<ColorPicker config="backgroundColor" />} />
					<OptionRow label="Grid Color" control={<ColorPicker config="gridLineColor" />} />
				</SidebarSection>
				<SidebarSection header="Border Settings">
					<OptionRow label="Border Style" control={<Select config="borderStyle" options={[
						["Diep.io", "newDiep"],
						["Old Diep.io (single color)", "oldDiep"],
						["Arras.io (this may be wrong)", "arras"],
					]} />} />
				</SidebarSection>
			</div>
			<div style={{
				bottom: 10,
				left: 0,
				marginLeft: "auto",
				marginRight: "auto",
				paddingTop: 30,
				position: "relative",
				right: 0,
				textAlign: "center",
			}}>
				<Icon icon="fa-reddit" link="https://www.reddit.com/r/DiepStudio/" title="Reddit" />
				<Icon icon="fa-github" link="https://github.com/haykam821/Diep-Studio" title="GitHub" />
				<Icon icon="fa-discord" link="https://discord.gg/5yDRQdf" title="Discord" />
			</div>
		</div>;
	}
}
module.exports = Sidebar;