// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import BarDisplay, {
	defaultProps as barDisplayDefaultProps,
} from "./BarDisplay";

export default {
	title: "lib/containers/Bars/components/BarDisplay",
	component: BarDisplay,
} as ComponentMeta<typeof BarDisplay>;

const Template: ComponentStory<typeof BarDisplay> = (args) => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDisplay {...args} />
		</svg>
	);
};

export const Original = Template.bind({});
Original.args = barDisplayDefaultProps;

export const CustomWidth = Template.bind({});
CustomWidth.args = {
	...Original.args,
	barStyle: {
		...Original.args.barStyle,
		width: "700px",
	},
};
