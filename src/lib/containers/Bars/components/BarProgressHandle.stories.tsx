// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import BarProgressHandle, {
	defaultProps as barProgressHandleDefaultProps,
} from "./BarProgressHandle";

export default {
	title: "lib/containers/Bars/components/BarProgressHandle",
	component: BarProgressHandle,
} as ComponentMeta<typeof BarProgressHandle>;

const Template: ComponentStory<typeof BarProgressHandle> = (args) => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarProgressHandle {...args} />
		</svg>
	);
};

export const Original = Template.bind({});
Original.args = barProgressHandleDefaultProps;

export const Hidden = Template.bind({});
Hidden.args = {
	...Original.args,
	rootStyle: {
		...Original.args.rootStyle,
		visibility: "hidden",
		opacity: 0,
	},
};
