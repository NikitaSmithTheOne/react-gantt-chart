// *** NPM ***
import React from "react";

// *** OTHER ***
import BarDisplay from "./BarDisplay";

export default {
	title: "TaskItem/BarDisplay",
	component: BarDisplay,
};

// Default
export const Default = () => {
	return <BarDisplay />;
};
Default.storyName = "Default";

// Selected
export const Selected = () => {
	return <BarDisplay isSelected />;
};
Selected.storyName = "Selected";

// Custom Width
export const CustomWidth = () => {
	return <BarDisplay width={700} />;
};
CustomWidth.storyName = "Custom Width";
