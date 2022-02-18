// *** NPM ***
import React, { useEffect, useRef } from "react";

// *** OTHER ***
import TaskListHeader, {
	IProps as TaskListHeaderProps,
} from "./components/TaskListHeader";
import TaskListTable, {
	IProps as TaskListTableProps,
} from "./components/TaskListTable";

// *** TYPES ***
export type IProps = {
	scrollY: number;
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
		scrollY,
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

	// *** USE REF ***
	const horizontalContainerRef = useRef<HTMLDivElement>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (horizontalContainerRef.current) {
			horizontalContainerRef.current.scrollTop = scrollY;
		}
	}, [scrollY]);

	return (
		<div ref={taskListRef}>
			{/* HEADER */}
			<TaskListHeader {...taskListHeaderProps} />

			<div style={taskListTableWrapperStyles} ref={horizontalContainerRef}>
				{/* TABLE */}
				<TaskListTable {...taskListTableProps} />
			</div>
		</div>
	);
};

export default TaskList;
