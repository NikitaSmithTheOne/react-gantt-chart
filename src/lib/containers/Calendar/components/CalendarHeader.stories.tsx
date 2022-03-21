// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import CalendarHeader, {
	defaultProps as calendarHeaderDefaultProps,
} from "./CalendarHeader";

export default {
	title: "lib/containers/Calendar/components/CalendarHeader",
	component: CalendarHeader,
} as ComponentMeta<typeof CalendarHeader>;

const Template: ComponentStory<typeof CalendarHeader> = (args) => {
	return (
		<svg style={{ overflow: "visible" }}>
			<CalendarHeader {...args} />
		</svg>
	);
};

export const Original = Template.bind({});
Original.args = {
	...calendarHeaderDefaultProps,
	value: "Title",
	x1Line: 500,
	y1Line: 0,
	y2Line: 25,
	xText: 250,
	yText: 25,
};
