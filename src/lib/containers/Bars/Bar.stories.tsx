// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import Bar, { defaultProps as barDefaultProps } from "./Bar";
import BarDisplay from "./components/BarDisplay";

export default {
	title: "lib/containers/Bars/Bar",
	component: Bar,
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => {
	return (
		<svg style={{ overflow: "visible" }}>
			<Bar {...args} />
		</svg>
	);
};

export const Original = Template.bind({});
Original.args = barDefaultProps;

export const WithBarDisplay = Template.bind({});
WithBarDisplay.args = {
	...Original.args,
	barDisplay: <BarDisplay />,
};
