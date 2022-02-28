// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import VerticalScroll, {
	defaultProps as verticalScrollDefaultProps,
} from "./VerticalScroll";

export default {
	title: "lib/components/VerticalScroll",
	component: VerticalScroll,
} as ComponentMeta<typeof VerticalScroll>;

const Template: ComponentStory<typeof VerticalScroll> = (args) => {
	return <VerticalScroll {...args} />;
};

export const Original = Template.bind({});
Original.args = {
	scroll: 0,
	onScroll: (e) => console.log(e),
	// style
	rootStyle: {
		...verticalScrollDefaultProps.rootStyle,
		height: 200,
	},
	bodyStyle: {
		...verticalScrollDefaultProps.bodyStyle,
		height: 1000,
	},
};

export const CustomScroll = Template.bind({});
CustomScroll.args = {
	...Original.args,
	scroll: 200,
};
