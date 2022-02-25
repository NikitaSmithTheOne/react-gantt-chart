// *** NPM ***
import React from "react";

// *** OTHER ***
import HorizontalScroll, {
	defaultProps as horizontalScrollDefaultProps,
} from "./HorizontalScroll";

export default {
	title: "lib/components/HorizontalScroll",
	component: HorizontalScroll,
};

export const Original = () => {
	return (
		<HorizontalScroll
			scroll={100}
			onScroll={(...args) => console.log(args)}
			// style
			bodyStyle={{
				...horizontalScrollDefaultProps.bodyStyle,
				width: 2000,
			}}
		/>
	);
};
