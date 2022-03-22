// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import TaskListHeader, {
	defaultProps as taskListHeaderDefaultProps,
} from "./TaskListHeader";

// *** CONSTANTS ***
const HEADER_HEIGHT = 50;
const ROW_WIDTH = 200;

export default {
	title: "lib/containers/TaskList/components/TaskListHeader",
	component: TaskListHeader,
} as ComponentMeta<typeof TaskListHeader>;

const Template: ComponentStory<typeof TaskListHeader> = (args) => {
	return <TaskListHeader {...args} />;
};

export const Original = Template.bind({});
Original.args = { ...taskListHeaderDefaultProps };

export const Custom = Template.bind({});
Custom.args = {
	...Original.args,
	rootStyle: {
		...taskListHeaderDefaultProps.rootStyle,
		fontFamily: "sans-serif",
		fontSize: "20px",
	},
	headerStyle: {
		...taskListHeaderDefaultProps.headerStyle,
		height: HEADER_HEIGHT - 2,
	},
	columnStyle: {
		...taskListHeaderDefaultProps.columnStyle,
		minWidth: ROW_WIDTH,
		textAlign: "center",
	},
	columnSeparatorStyle: {
		...taskListHeaderDefaultProps.columnSeparatorStyle,
		height: HEADER_HEIGHT * 0.5,
		marginTop: HEADER_HEIGHT * 0.2,
	},
};
