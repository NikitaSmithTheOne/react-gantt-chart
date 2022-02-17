// *** NPM ***
import React from "react";

// *** OTHER ***
import BarDisplay from "./BarDisplay";

export default {
	title: "Bars/BarDisplay",
	component: BarDisplay,
};

// Original
export const Original = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDisplay />
		</svg>
	);
};
Original.storyName = "Original";

// Custom Width
export const OriginalCustomWidth = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDisplay width={700} />;
		</svg>
	);
};
OriginalCustomWidth.storyName = "Original Custom Width";
