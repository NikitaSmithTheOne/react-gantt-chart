// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import TaskListTable, {
	IProps as ITaskListTableProps,
	defaultProps as taskListTableDefaultProps,
} from "./TaskListTable";

// *** CONSTANTS ***
const TASKS: ITaskListTableProps["tasks"] = [
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
		type: "task",
	},
	{
		start: new Date(2022, 10, 12),
		end: new Date(2022, 10, 24),
		name: "Some Project 3",
		id: "ProjectSample 3",
		progress: 25,
		type: "task",
	},
];

export default {
	title: "lib/containers/TaskList/components/TaskListTable",
	component: TaskListTable,
} as ComponentMeta<typeof TaskListTable>;

const Template: ComponentStory<typeof TaskListTable> = (args) => {
	return <TaskListTable {...args} />;
};

export const Original = Template.bind({});
Original.args = {
	...taskListTableDefaultProps,
	tasks: TASKS,
	locale: "en-GB",
	onExpanderClick: (...args) => console.log(args),
};

export const Custom = Template.bind({});
Custom.args = {
	...Original.args,
	rootStyle: {
		...taskListTableDefaultProps.rootStyle,
		fontFamily: "sans-serif",
		fontSize: "15px",
	},
	tableRowStyle: {
		...taskListTableDefaultProps.tableRowStyle,
		height: "50px",
	},
	tableCellStyle: {
		...taskListTableDefaultProps.tableCellStyle,
		minWidth: "200px",
		maxWidth: "200px",
	},
};
