// *** NPM ***
import React from "react";

// *** OTHER ***
import BarDisplay, {
	defaultProps as barDisplayDefaultProps,
} from "./BarDisplay";

export default {
	title: "lib/containers/Bars/components/BarDisplay",
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
			<BarDisplay
				// style
				barStyle={{ ...barDisplayDefaultProps.barStyle, width: "700px" }}
			/>
			;
		</svg>
	);
};
OriginalCustomWidth.storyName = "Original Custom Width";
