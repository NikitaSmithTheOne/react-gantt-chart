// *** NPM ***
import React from "react";

// *** OTHER ***
import BarProgressHandle from "./BarProgressHandle";

export default {
	title: "TaskItem/BarProgressHandle",
	component: BarProgressHandle,
};

// Default
export const Default = () => {
	return <BarProgressHandle />;
};
Default.storyName = "Default";

// Hidden
export const Hidden = () => {
	return <BarProgressHandle style={{ visibility: "hidden", opacity: 0 }} />;
};
Hidden.storyName = "Hidden";
