// *** NPM ***
import React from "react";

// *** OTHER ***
import VerticalScroll, {
	defaultProps as verticalScrollDefaultProps,
} from "./VerticalScroll";

export default {
	title: "VerticalScroll",
	component: VerticalScroll,
};

export const Original = () => {
	return (
		<VerticalScroll
			scroll={500}
			onScroll={(...args) => console.log(args)}
			// style
			rootStyle={{
				...verticalScrollDefaultProps.rootStyle,
				height: 100,
			}}
			bodyStyle={{
				...verticalScrollDefaultProps.bodyStyle,
				height: 1000,
			}}
		/>
	);
};
