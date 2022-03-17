// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import BarDateHandle, {
	defaultProps as barDateHandleDefaultProps,
} from "./BarDateHandle";

export default {
	title: "lib/containers/Bars/components/BarDateHandle",
	component: BarDateHandle,
	args: barDateHandleDefaultProps,
} as ComponentMeta<typeof BarDateHandle>;

const Template: ComponentStory<typeof BarDateHandle> = (args) => {
	return (
		<svg style={{ overflow: "visible" }}>
			<BarDateHandle {...args} />
		</svg>
	);
};

export const Original = Template.bind({});
Original.args = {};

export const Hidden = Template.bind({});
Hidden.args = {
	rootStyle: {
		visibility: "hidden",
		opacity: 0,
	},
};
