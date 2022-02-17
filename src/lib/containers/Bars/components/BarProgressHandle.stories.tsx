// *** NPM ***
import React from "react";

// *** OTHER ***
import BarProgressHandle, {
	defaultProps as barProgressHandleDefaultProps,
} from "./BarProgressHandle";

export default {
	title: "Bars/BarProgressHandle",
	component: BarProgressHandle,
};

export const Original = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarProgressHandle />
		</svg>
	);
};
Original.storyName = "Original";

export const OriginalHidden = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarProgressHandle
				rootStyle={{
					...barProgressHandleDefaultProps,
					visibility: "hidden",
					opacity: 0,
				}}
			/>
		</svg>
	);
};
OriginalHidden.storyName = "Original Hidden";
