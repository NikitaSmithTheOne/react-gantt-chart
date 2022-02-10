// *** NPM ***
import React, { useEffect, useRef } from "react";

// *** OTHER ***
import { BarTask } from "../../types/bar-task";
import { Task } from "../../types/public-types";

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
	TaskListHeader: React.FC<{
		headerHeight: number;
		rowWidth: string;
		fontFamily: string;
		fontSize: string;
	}>;
	TaskListTable: React.FC<{
		rowHeight: number;
		rowWidth: string;
		fontFamily: string;
		fontSize: string;
		locale: string;
		tasks: Task[];
		selectedTaskId: string;
		setSelectedTask: (taskId: string) => void;
		onExpanderClick: (task: Task) => void;
	}>;
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

	const horizontalContainerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (horizontalContainerRef.current) {
			horizontalContainerRef.current.scrollTop = scrollY;
		}
	}, [scrollY]);

	const headerProps = {
		headerHeight,
		fontFamily,
		fontSize,
		rowWidth,
	};
	const selectedTaskId = selectedTask ? selectedTask.id : "";
	const tableProps = {
		rowHeight,
		rowWidth,
		fontFamily,
		fontSize,
		tasks,
		locale,
		selectedTaskId: selectedTaskId,
		setSelectedTask,
		onExpanderClick,
	};

	return (
		<div ref={taskListRef}>
			<TaskListHeader {...headerProps} />
			<div
				ref={horizontalContainerRef}
				className={horizontalContainerClass}
				style={ganttHeight ? { height: ganttHeight } : {}}
			>
				<TaskListTable {...tableProps} />
			</div>
		</div>
	);
};

export default TaskList;
