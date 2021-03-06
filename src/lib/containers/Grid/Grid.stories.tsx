// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import Grid, {
	IProps as IGridBodyProps,
	defaultProps as gridDefaultProps,
} from "./Grid";

const TASKS: IGridBodyProps["tasks"] = [
	{
		start: new Date(2022, 10, 10),
		end: new Date(2022, 10, 20),
		name: "Some Project 1",
		id: "ProjectSample 1",
		progress: 25,
		type: "project",
		hideChildren: false,
	},
	{
		start: new Date(2022, 10, 11),
		end: new Date(2022, 10, 22),
		name: "Some Project 2",
		id: "ProjectSample 2",
		progress: 25,
		type: "project",
	},
	{
		start: new Date(2022, 10, 12),
		end: new Date(2022, 10, 24),
		name: "Some Project 3",
		id: "ProjectSample 3",
		progress: 25,
		type: "project",
	},
	{
		start: new Date(2022, 10, 12),
		end: new Date(2022, 10, 24),
		name: "Some Project 4",
		id: "ProjectSample 4",
		progress: 25,
		type: "project",
	},
];

export default {
	title: "lib/containers/Grid/Grid",
	component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => {
	return <Grid {...args} />;
};

export const Original = Template.bind({});
Original.args = {
	...gridDefaultProps,
	tasks: TASKS,
	dates: [
		new Date(2022, 10, 10),
		new Date(2022, 10, 11),
		new Date(2022, 10, 12),
		new Date(2022, 10, 13),
		new Date(2022, 10, 15),
		new Date(2022, 10, 16),
		new Date(2022, 10, 17),
		new Date(2022, 10, 18),
		new Date(2022, 10, 19),
		new Date(2022, 10, 20),
	],
	svgWidth: 1000,
	rtl: false,
	rowHeight: 50,
	columnWidth: 50,
	todayColor: "",
};
