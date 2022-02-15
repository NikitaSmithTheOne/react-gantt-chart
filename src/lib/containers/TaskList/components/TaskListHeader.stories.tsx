// *** NPM ***
import React from "react";

// *** OTHER ***
import TaskListHeader, {
	defaultProps as taskListHeaderDefaultProps,
} from "./TaskListHeader";

export default {
	title: "TaskList/TaskListHeader",
	component: TaskListHeader,
};

// Default
export const Default = () => {
	return <TaskListHeader />;
};

// Simple
export const Simple = () => {
	const headerHeight = 50;
	const rowWidth = 200;

	return (
		<TaskListHeader
			rootStyle={{
				...taskListHeaderDefaultProps.rootStyle,
				fontFamily: "sans-serif",
				fontSize: "20px",
			}}
			headerStyle={{
				...taskListHeaderDefaultProps.headerStyle,
				height: headerHeight - 2,
			}}
			columnStyle={{
				...taskListHeaderDefaultProps.columnStyle,
				minWidth: rowWidth,
				textAlign: "center",
			}}
			columnSeparatorStyle={{
				...taskListHeaderDefaultProps.columnSeparatorStyle,
				height: headerHeight * 0.5,
				marginTop: headerHeight * 0.2,
			}}
		/>
	);
};
