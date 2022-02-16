// *** NPM ***
import React from "react";

// *** OTHER ***
import BarDisplay from "./BarDisplay";

export default {
	title: "Bars/BarDisplay",
	component: BarDisplay,
};

// Default
export const Default = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDisplay />
		</svg>
	);
};
Default.storyName = "Default";

// Selected
export const Selected = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDisplay isSelected />
		</svg>
	);
};
Selected.storyName = "Selected";

// Custom Width
export const CustomWidth = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDisplay width={700} />;
		</svg>
	);
};
CustomWidth.storyName = "Custom Width";
