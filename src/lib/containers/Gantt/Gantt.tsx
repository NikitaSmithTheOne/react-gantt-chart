// *** NPM ***
import React, { useState, SyntheticEvent, useRef, useEffect } from "react";

// *** OTHER ***
import {
	ViewMode,
	Task,
	EventOption,
	DisplayOption,
	StylingOption,
} from "../../types/public-types";
import { IProps as GridProps } from "../Grid/Grid";
import { ganttDateRange, seedDates } from "../../helpers/date-helper";
import { IProps as CalendarProps } from "../Calendar/Calendar";
import { IProps as TaskGanttContentProps } from "./components/GanttTaskContent";
import TaskListHeaderDefault from "../TaskList/components/TaskListHeader";
import TaskListTableDefault from "../TaskList/components/TaskListTable";
import Tooltip, { StandardTooltipContent } from "../../components/Tooltip";
import VerticalScroll from "../../components/VerticalScroll";
import TaskList, { IProps as TaskListProps } from "../TaskList/TaskList";
import GanttTask from "./components/GanttTask";
import { BarTask } from "../../types/bar-task";
import { convertToBarTasks } from "../../helpers/bar-helper";
import { GanttEvent } from "../../types/gantt-task-actions";
import { DateSetup } from "../../types/date-setup";
import { HorizontalScroll } from "../../components/HorizontalScroll";
import { removeHiddenTasks } from "../../helpers/other-helper";

// *** STYLES ***
import styles from "./Gantt.module.css";

// *** TYPES ***
export interface IProps extends EventOption, DisplayOption, StylingOption {
	tasks: Task[];
}

const Gantt = (props: IProps) => {
	// *** PROPS ***
	const {
		tasks,
		headerHeight = 50,
		columnWidth = 60,
		listCellWidth = "155px",
		rowHeight = 50,
		ganttHeight = 0,
		viewMode = ViewMode.Day,
		locale = "en-GB",
		barFill = 60,
		barCornerRadius = 3,
		barProgressColor = "#a3a3ff",
		barProgressSelectedColor = "#8282f5",
		barBackgroundColor = "#b8c2cc",
		barBackgroundSelectedColor = "#aeb8c2",
		projectProgressColor = "#7db59a",
		projectProgressSelectedColor = "#59a985",
		projectBackgroundColor = "#fac465",
		projectBackgroundSelectedColor = "#f7bb53",
		milestoneBackgroundColor = "#f1c453",
		milestoneBackgroundSelectedColor = "#f29e4c",
		rtl = false,
		handleWidth = 8,
		timeStep = 300000,
		arrowColor = "grey",
		fontFamily = "Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue",
		fontSize = "14px",
		arrowIndent = 20,
		todayColor = "rgba(252, 248, 227, 0.5)",
		TooltipContent = StandardTooltipContent,
		TaskListHeader = TaskListHeaderDefault,
		TaskListTable = TaskListTableDefault,
		onDateChange,
		onProgressChange,
		onDoubleClick,
		onDelete,
		onSelect,
		onExpanderClick,
	} = props;

	// *** USE STATE ***
	const [dateSetup, setDateSetup] = useState<DateSetup>(() => {
		const [startDate, endDate] = ganttDateRange(tasks, viewMode);
		return { viewMode, dates: seedDates(startDate, endDate, viewMode) };
	});
	const [taskHeight, setTaskHeight] = useState((rowHeight * barFill) / 100);
	const [taskListWidth, setTaskListWidth] = useState(0);
	const [svgContainerWidth, setSvgContainerWidth] = useState(0);
	const [svgContainerHeight, setSvgContainerHeight] = useState(ganttHeight);
	const [barTasks, setBarTasks] = useState<BarTask[]>([]);
	const [ganttEvent, setGanttEvent] = useState<GanttEvent>({
		action: "",
	});
	const [selectedTask, setSelectedTask] = useState<BarTask>();
	const [failedTask, setFailedTask] = useState<BarTask | null>(null);
	const [scrollY, setScrollY] = useState(0);
	const [scrollX, setScrollX] = useState(-1);
	const [ignoreScrollEvent, setIgnoreScrollEvent] = useState(false);

	// *** USE REF ***
	const wrapperRef = useRef<HTMLDivElement>(null);
	const taskListRef = useRef<HTMLDivElement>(null);

	const svgWidth = dateSetup.dates.length * columnWidth;
	const ganttFullHeight = barTasks.length * rowHeight;

	// *** USE EFFECT ***
	useEffect(() => {
		const filteredTasks: Task[] = onExpanderClick
			? removeHiddenTasks(tasks)
			: tasks;

		const [startDate, endDate] = ganttDateRange(filteredTasks, viewMode);
		let newDates = seedDates(startDate, endDate, viewMode);
		if (rtl) {
			newDates = newDates.reverse();
			if (scrollX === -1) {
				setScrollX(newDates.length * columnWidth);
			}
		}
		setDateSetup({ dates: newDates, viewMode });
		setBarTasks(
			convertToBarTasks(
				filteredTasks,
				newDates,
				columnWidth,
				rowHeight,
				taskHeight,
				barCornerRadius,
				handleWidth,
				rtl,
				barProgressColor,
				barProgressSelectedColor,
				barBackgroundColor,
				barBackgroundSelectedColor,
				projectProgressColor,
				projectProgressSelectedColor,
				projectBackgroundColor,
				projectBackgroundSelectedColor,
				milestoneBackgroundColor,
				milestoneBackgroundSelectedColor
			)
		);
	}, [
		tasks,
		viewMode,
		rowHeight,
		barCornerRadius,
		columnWidth,
		taskHeight,
		handleWidth,
		barProgressColor,
		barProgressSelectedColor,
		barBackgroundColor,
		barBackgroundSelectedColor,
		projectProgressColor,
		projectProgressSelectedColor,
		projectBackgroundColor,
		projectBackgroundSelectedColor,
		milestoneBackgroundColor,
		milestoneBackgroundSelectedColor,
		rtl,
		scrollX,
		onExpanderClick,
	]);

	useEffect(() => {
		const { changedTask, action } = ganttEvent;
		if (changedTask) {
			if (action === "delete") {
				setGanttEvent({ action: "" });
				setBarTasks(barTasks.filter((t) => t.id !== changedTask.id));
			} else if (
				action === "move" ||
				action === "end" ||
				action === "start" ||
				action === "progress"
			) {
				const prevStateTask = barTasks.find((t) => t.id === changedTask.id);
				if (
					prevStateTask &&
					(prevStateTask.start.getTime() !== changedTask.start.getTime() ||
						prevStateTask.end.getTime() !== changedTask.end.getTime() ||
						prevStateTask.progress !== changedTask.progress)
				) {
					// actions for change
					const newTaskList = barTasks.map((t) =>
						t.id === changedTask.id ? changedTask : t
					);
					setBarTasks(newTaskList);
				}
			}
		}
	}, [ganttEvent, barTasks]);

	useEffect(() => {
		if (failedTask) {
			setBarTasks(
				barTasks.map((t) => (t.id !== failedTask.id ? t : failedTask))
			);
			setFailedTask(null);
		}
	}, [failedTask, barTasks]);

	useEffect(() => {
		const newTaskHeight = (rowHeight * barFill) / 100;
		if (newTaskHeight !== taskHeight) {
			setTaskHeight(newTaskHeight);
		}
	}, [rowHeight, barFill, taskHeight]);

	useEffect(() => {
		if (!listCellWidth) {
			setTaskListWidth(0);
		}
		if (taskListRef.current) {
			setTaskListWidth(taskListRef.current.offsetWidth);
		}
	}, [taskListRef, listCellWidth]);

	useEffect(() => {
		if (wrapperRef.current) {
			setSvgContainerWidth(wrapperRef.current.offsetWidth - taskListWidth);
		}
	}, [wrapperRef, taskListWidth]);

	useEffect(() => {
		if (ganttHeight) {
			setSvgContainerHeight(ganttHeight + headerHeight);
		} else {
			setSvgContainerHeight(tasks.length * rowHeight + headerHeight);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ganttHeight, tasks]);

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			if (event.shiftKey || event.deltaX) {
				const scrollMove = event.deltaX ? event.deltaX : event.deltaY;
				let newScrollX = scrollX + scrollMove;
				if (newScrollX < 0) {
					newScrollX = 0;
				} else if (newScrollX > svgWidth) {
					newScrollX = svgWidth;
				}
				setScrollX(newScrollX);
				event.preventDefault();
			} else if (ganttHeight) {
				let newScrollY = scrollY + event.deltaY;
				if (newScrollY < 0) {
					newScrollY = 0;
				} else if (newScrollY > ganttFullHeight - ganttHeight) {
					newScrollY = ganttFullHeight - ganttHeight;
				}
				if (newScrollY !== scrollY) {
					setScrollY(newScrollY);
					event.preventDefault();
				}
			}

			setIgnoreScrollEvent(true);
		};

		// subscribe if scroll is necessary
		if (wrapperRef.current) {
			wrapperRef.current.addEventListener("wheel", handleWheel, {
				passive: false,
			});
		}
		return () => {
			if (wrapperRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				wrapperRef.current.removeEventListener("wheel", handleWheel);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wrapperRef.current, scrollY, scrollX, ganttHeight, svgWidth, rtl]);

	// *** HANDLERS ***
	const handleScrollY = (event: SyntheticEvent<HTMLDivElement>) => {
		if (scrollY !== event.currentTarget.scrollTop && !ignoreScrollEvent) {
			setScrollY(event.currentTarget.scrollTop);
		}
		setIgnoreScrollEvent(false);
	};

	const handleScrollX = (event: SyntheticEvent<HTMLDivElement>) => {
		if (scrollX !== event.currentTarget.scrollLeft && !ignoreScrollEvent) {
			setScrollX(event.currentTarget.scrollLeft);
		}
		setIgnoreScrollEvent(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		event.preventDefault();
		let newScrollY = scrollY;
		let newScrollX = scrollX;
		let isX = true;
		switch (event.key) {
			case "Down": // IE/Edge specific value
			case "ArrowDown":
				newScrollY += rowHeight;
				isX = false;
				break;
			case "Up": // IE/Edge specific value
			case "ArrowUp":
				newScrollY -= rowHeight;
				isX = false;
				break;
			case "Left":
			case "ArrowLeft":
				newScrollX -= columnWidth;
				break;
			case "Right": // IE/Edge specific value
			case "ArrowRight":
				newScrollX += columnWidth;
				break;
		}
		if (isX) {
			if (newScrollX < 0) {
				newScrollX = 0;
			} else if (newScrollX > svgWidth) {
				newScrollX = svgWidth;
			}
			setScrollX(newScrollX);
		} else {
			if (newScrollY < 0) {
				newScrollY = 0;
			} else if (newScrollY > ganttFullHeight - ganttHeight) {
				newScrollY = ganttFullHeight - ganttHeight;
			}
			setScrollY(newScrollY);
		}
		setIgnoreScrollEvent(true);
	};

	const handleSelectedTask = (taskId: string) => {
		const newSelectedTask = barTasks.find((t) => t.id === taskId);
		const oldSelectedTask = barTasks.find(
			(t) => !!selectedTask && t.id === selectedTask.id
		);
		if (onSelect) {
			if (oldSelectedTask) {
				onSelect(oldSelectedTask, false);
			}
			if (newSelectedTask) {
				onSelect(newSelectedTask, true);
			}
		}
		setSelectedTask(newSelectedTask);
	};

	const handleExpanderClick = (task: Task) => {
		if (onExpanderClick && task.hideChildren !== undefined) {
			onExpanderClick({ ...task, hideChildren: !task.hideChildren });
		}
	};

	// *** CONDITIONALS ***
	const gridProps: GridProps = {
		columnWidth,
		svgWidth,
		tasks: tasks,
		rowHeight,
		dates: dateSetup.dates,
		todayColor,
		rtl,
	};

	const calendarProps: CalendarProps = {
		dateSetup,
		locale,
		viewMode,
		headerHeight,
		columnWidth,
		rtl,
		rootStyle: {
			fontFamily,
			fontSize,
		},
	};

	const barProps: TaskGanttContentProps = {
		tasks: barTasks,
		dates: dateSetup.dates,
		ganttEvent,
		selectedTask,
		rowHeight,
		taskHeight,
		columnWidth,
		arrowColor,
		timeStep,
		fontFamily,
		fontSize,
		arrowIndent,
		svgWidth,
		rtl,
		setGanttEvent,
		setFailedTask,
		setSelectedTask: handleSelectedTask,
		onDateChange,
		onProgressChange,
		onDoubleClick,
		onDelete,
	};

	const tableProps: TaskListProps = {
		rowHeight,
		rowWidth: listCellWidth,
		fontFamily,
		fontSize,
		tasks: barTasks,
		locale,
		headerHeight,
		scrollY,
		ganttHeight,
		horizontalContainerClass: styles.horizontalContainer,
		selectedTask,
		taskListRef,
		setSelectedTask: handleSelectedTask,
		onExpanderClick: handleExpanderClick,
		TaskListHeader,
		TaskListTable,
	};

	return (
		<div>
			<div
				className={styles.wrapper}
				onKeyDown={handleKeyDown}
				tabIndex={0}
				ref={wrapperRef}
			>
				{listCellWidth && <TaskList {...tableProps} />}
				<GanttTask
					gridProps={gridProps}
					calendarProps={calendarProps}
					barProps={barProps}
					ganttHeight={ganttHeight}
					scrollY={scrollY}
					scrollX={scrollX}
				/>
				{ganttEvent.changedTask && (
					<Tooltip
						arrowIndent={arrowIndent}
						rowHeight={rowHeight}
						svgContainerHeight={svgContainerHeight}
						svgContainerWidth={svgContainerWidth}
						fontFamily={fontFamily}
						fontSize={fontSize}
						scrollX={scrollX}
						scrollY={scrollY}
						task={ganttEvent.changedTask}
						headerHeight={headerHeight}
						taskListWidth={taskListWidth}
						TooltipContent={TooltipContent}
						rtl={rtl}
						svgWidth={svgWidth}
					/>
				)}
				<VerticalScroll
					ganttFullHeight={ganttFullHeight}
					ganttHeight={ganttHeight}
					headerHeight={headerHeight}
					scroll={scrollY}
					onScroll={handleScrollY}
					rtl={rtl}
				/>
			</div>
			<HorizontalScroll
				svgWidth={svgWidth}
				taskListWidth={taskListWidth}
				scroll={scrollX}
				rtl={rtl}
				onScroll={handleScrollX}
			/>
		</div>
	);
};

export default Gantt;
