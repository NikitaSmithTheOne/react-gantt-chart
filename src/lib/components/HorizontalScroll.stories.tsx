// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import HorizontalScroll, {
	defaultProps as horizontalScrollDefaultProps,
} from "./HorizontalScroll";

export default {
	title: "lib/components/HorizontalScroll",
	component: HorizontalScroll,
} as ComponentMeta<typeof HorizontalScroll>;

const Template: ComponentStory<typeof HorizontalScroll> = (args) => {
	return <HorizontalScroll {...args} />;
};

export const Original = Template.bind({});
Original.args = {
	scroll: 0,
	onScroll: (e) => console.log(e),
	// styles
	rootStyle: horizontalScrollDefaultProps.rootStyle,
	bodyStyle: {
		...horizontalScrollDefaultProps.bodyStyle,
		width: 3000,
	},
};

export const CustomScroll = Template.bind({});
CustomScroll.args = {
	...Original.args,
	scroll: 200,
};
