// *** NPM ***
import React from "react";

// *** OTHER ***
import HorizontalScroll from "./HorizontalScroll";

export default {
	title: "HorizontalScroll",
	component: HorizontalScroll,
};

export const Original = () => {
	return (
		<HorizontalScroll
			scroll={100}
			svgWidth={2000}
			taskListWidth={400}
			rtl={true}
			onScroll={(...args) => console.log(args)}
		/>
	);
};
