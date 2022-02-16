// *** NPM ***
import React from "react";

// *** OTHER ***
import BarDateHandle from "./BarDateHandle";

export default {
	title: "Bars/BarDateHandle",
	component: BarDateHandle,
};

// Default
export const Default = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDateHandle />
		</svg>
	);
};
Default.storyName = "Default";

// Hidden
export const Hidden = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDateHandle style={{ visibility: "hidden", opacity: 0 }} />
		</svg>
	);
};
Hidden.storyName = "Hidden";
