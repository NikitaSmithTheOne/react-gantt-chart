// *** NPM ***
import React from "react";

// *** OTHER ***
import BarDateHandle from "./BarDateHandle";

export default {
	title: "Bars/BarDateHandle",
	component: BarDateHandle,
};

export const Original = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDateHandle />
		</svg>
	);
};
Original.storyName = "Original";

export const OriginalHidden = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDateHandle rootStyle={{ visibility: "hidden", opacity: 0 }} />
		</svg>
	);
};
OriginalHidden.storyName = "Original Hidden";
