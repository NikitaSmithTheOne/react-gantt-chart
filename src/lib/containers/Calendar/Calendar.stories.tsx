// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import { ViewMode } from "../../types/public-types";
import Calendar, { defaultProps as calendarDefaultProps } from "./Calendar";

export default {
	title: "lib/containers/Calendar/Calendar",
	component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => {
	return <Calendar {...args} />;
};

export const Daily = Template.bind({});
Daily.args = {
	...calendarDefaultProps,
	dateSetup: {
		dates: [
			new Date(2022, 10, 26),
			new Date(2022, 10, 27),
			new Date(2022, 10, 28),
			new Date(2022, 10, 29),
			new Date(2022, 10, 30),
			new Date(2022, 11, 1),
			new Date(2022, 11, 2),
			new Date(2022, 11, 3),
			new Date(2022, 11, 4),
		],
		viewMode: ViewMode.Day,
	},
	locale: "ru",
	rtl: false,
	headerHeight: 50,
	columnWidth: 50,
};

export const Monthly = Template.bind({});
Monthly.args = {
	...Daily.args,
	dateSetup: {
		dates: [
			new Date(2022, 7, 1),
			new Date(2022, 8, 1),
			new Date(2022, 9, 1),
			new Date(2022, 10, 1),
			new Date(2022, 11, 1),
			new Date(2022, 12, 1),
		],
		viewMode: ViewMode.Month,
	},
	columnWidth: 150,
};

export const MonthlyCustomLocale = Template.bind({});
MonthlyCustomLocale.args = {
	...Monthly.args,
	locale: "us",
};
