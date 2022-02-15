// *** NPM ***
import React from "react";

// *** OTHER ***
import TaskListTable, {
	IProps as ITaskListTableProps,
	defaultProps as taskListTableDefaultProps,
} from "./TaskListTable";

export default {
	title: "TaskList/TaskListTable",
	component: TaskListTable,
};

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
];

// Default Styles
export const DefaultStyles = () => {
	const props: ITaskListTableProps = {
		tasks: TASKS,
		locale: "en-GB",
		onExpanderClick: (e) => console.log(e),
		selectedTaskId: "ProjectSample",
		setSelectedTask: (taskId) => console.log(taskId),
	};

	return <TaskListTable {...props} />;
};

// Custom Styles
export const CustomStyles = () => {
	const fontFamily: React.CSSProperties["fontFamily"] = "sans-serif";
	const fontSize: React.CSSProperties["fontSize"] = "15px";
	const rowWidth = 200;
	const rowHeight = 50;

	const props: ITaskListTableProps = {
		tasks: TASKS,
		locale: "en-GB",
		onExpanderClick: (e) => console.log(e),
		selectedTaskId: "ProjectSample",
		setSelectedTask: (taskId) => console.log(taskId),
		// style
		rootStyle: {
			...taskListTableDefaultProps.rootStyle,
			fontFamily,
			fontSize,
		},
		tableRowStyle: {
			...taskListTableDefaultProps.tableRowStyle,
			height: rowHeight,
		},
		tableCellStyle: {
			...taskListTableDefaultProps.tableCellStyle,
			minWidth: rowWidth,
			maxWidth: rowWidth,
		},
	};

	return <TaskListTable {...props} />;
};
