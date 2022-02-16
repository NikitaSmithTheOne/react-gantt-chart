// *** NPM ***
import React from "react";

// *** OTHER ***
import BarProgressHandle from "./BarProgressHandle";

export default {
	title: "Bars/BarProgressHandle",
	component: BarProgressHandle,
};

// Default
export const Default = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarProgressHandle />
		</svg>
	);
};
Default.storyName = "Default";

// Hidden
export const Hidden = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarProgressHandle style={{ visibility: "hidden", opacity: 0 }} />
		</svg>
	);
};
Hidden.storyName = "Hidden";
