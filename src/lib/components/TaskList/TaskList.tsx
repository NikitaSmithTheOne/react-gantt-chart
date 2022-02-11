// *** NPM ***
import React, { useEffect, useRef } from "react";

// *** OTHER ***
import { BarTask } from "../../types/bar-task";
import { Task } from "../../types/public-types";
import { IProps as TaskListHeaderProps } from "./TaskListHeader";
import { IProps as TaskListTableProps } from "./TaskListTable";

// *** TYPES ***
export type IProps = {
	headerHeight: number;
	rowWidth: string;
	fontFamily: string;
	fontSize: string;
	rowHeight: number;
	ganttHeight: number;
	scrollY: number;
	locale: string;
	tasks: Task[];
	taskListRef: React.RefObject<HTMLDivElement>;
	horizontalContainerClass?: string;
	selectedTask: BarTask | undefined;
	setSelectedTask: (task: string) => void;
	onExpanderClick: (task: Task) => void;
	TaskListHeader: React.FC<TaskListHeaderProps>;
	TaskListTable: React.FC<TaskListTableProps>;
};

const TaskList = (props: IProps) => {
	// *** PROPS ***
	const {
		TaskListHeader,
		TaskListTable,
		fontFamily,
		fontSize,
		ganttHeight,
		headerHeight,
		locale,
		onExpanderClick,
		rowHeight,
		rowWidth,
		scrollY,
		selectedTask,
		setSelectedTask,
		taskListRef,
		tasks,
		horizontalContainerClass,
	} = props;

	// *** USE REF ***
	const horizontalContainerRef = useRef<HTMLDivElement>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (horizontalContainerRef.current) {
			horizontalContainerRef.current.scrollTop = scrollY;
		}
	}, [scrollY]);

	// *** CONDITIONALS ***
	// header
	const headerProps: TaskListHeaderProps = {
		headerHeight,
		fontFamily,
		fontSize,
		rowWidth,
	};

	// table
	const tableProps: TaskListTableProps = {
		rowHeight,
		rowWidth,
		fontFamily,
		fontSize,
		tasks,
		locale,
		selectedTaskId: selectedTask ? selectedTask.id : "",
		setSelectedTask,
		onExpanderClick,
	};

	return (
		<div ref={taskListRef}>
			{/* HEADER */}
			<TaskListHeader {...headerProps} />

			{/* TABLE */}
			<div
				ref={horizontalContainerRef}
				className={horizontalContainerClass}
				style={{ height: ganttHeight || undefined }}
			>
				<TaskListTable {...tableProps} />
			</div>
		</div>
	);
};

export default TaskList;
