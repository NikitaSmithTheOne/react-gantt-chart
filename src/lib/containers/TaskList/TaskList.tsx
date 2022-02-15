// *** NPM ***
import React, { useEffect, useRef } from "react";

// *** OTHER ***
import { BarTask } from "../../types/bar-task";
import { Task } from "../../types/public-types";
import TaskListHeader, {
	IProps as TaskListHeaderProps,
	defaultProps as taskListHeaderDefaultProps,
} from "./components/TaskListHeader";
import TaskListTable, {
	IProps as TaskListTableProps,
	defaultProps as taskListTableDefaultProps,
} from "./components/TaskListTable";

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
	TaskListHeader: typeof TaskListHeader;
	TaskListTable: typeof TaskListTable;
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
		rootStyle: {
			...taskListHeaderDefaultProps.rootStyle,
			fontFamily,
			fontSize,
		},
		headerStyle: {
			...taskListHeaderDefaultProps.headerStyle,
			height: headerHeight - 2,
		},
		columnStyle: {
			...taskListHeaderDefaultProps.columnStyle,
			minWidth: rowWidth,
		},
		columnSeparatorStyle: {
			...taskListHeaderDefaultProps.columnSeparatorStyle,
			height: headerHeight * 0.5,
			marginTop: headerHeight * 0.2,
		},
	};

	// table list
	const tableListProps: TaskListTableProps = {
		tasks,
		locale,
		selectedTaskId: selectedTask ? selectedTask.id : "",
		setSelectedTask,
		onExpanderClick,
		// styles
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
				<TaskListTable {...tableListProps} />
			</div>
		</div>
	);
};

export default TaskList;
