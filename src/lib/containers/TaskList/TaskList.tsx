// *** NPM ***
import React from "react";

// *** OTHER ***
import TaskListHeader, {
	IProps as TaskListHeaderProps,
} from "./components/TaskListHeader";
import TaskListTable, {
	IProps as TaskListTableProps,
} from "./components/TaskListTable";

// *** TYPES ***
export type IProps = {
	// components
	TaskListHeader: typeof TaskListHeader;
	TaskListTable: typeof TaskListTable;
	// components props
	taskListHeaderProps: TaskListHeaderProps;
	taskListTableProps: TaskListTableProps;
	// styles
	taskListTableWrapperStyles?: React.CSSProperties;
	// refs
	taskListRef: React.RefObject<HTMLDivElement>;
};

const TaskList = (props: IProps) => {
	// *** PROPS ***
	const {
		// components
		TaskListHeader,
		TaskListTable,
		// components props
		taskListHeaderProps,
		taskListTableProps,
		// styles
		taskListTableWrapperStyles,
		// refs
		taskListRef,
	} = props;

	return (
		<div ref={taskListRef}>
			{/* HEADER */}
			<TaskListHeader {...taskListHeaderProps} />

			<div style={taskListTableWrapperStyles}>
				{/* TABLE */}
				<TaskListTable {...taskListTableProps} />
			</div>
		</div>
	);
};

export default TaskList;
