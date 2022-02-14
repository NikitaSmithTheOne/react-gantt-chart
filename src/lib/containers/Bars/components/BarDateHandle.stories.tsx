// *** NPM ***
import React from "react";

// *** OTHER ***
import BarDateHandle from "./BarDateHandle";

export default {
	title: "TaskItem/BarDateHandle",
	component: BarDateHandle,
};

// Default
export const Default = () => {
	return <BarDateHandle />;
};
Default.storyName = "Default";

// Hidden
export const Hidden = () => {
	return <BarDateHandle style={{ visibility: "hidden", opacity: 0 }} />;
};
Hidden.storyName = "Hidden";
