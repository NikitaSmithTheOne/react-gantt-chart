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
import { IProps as GridProps } from "../../containers/Grid/Grid";
import { ganttDateRange, seedDates } from "../../helpers/date-helper";
import {
	IProps as CalendarProps,
	defaultProps as calendarDefaultProps,
} from "../../containers/Calendar/Calendar";
import { IProps as ITaskGanttContentNationalResourcesProps } from "./components/GanttTaskContentNationalResources";
import TaskListHeaderDefault, {
	defaultProps as taskListHeaderDefaultProps,
} from "../../containers/TaskList/components/TaskListHeader";
import TaskListTableDefault, {
	defaultProps as taskListTableDefaultProps,
} from "../../containers/TaskList/components/TaskListTable";
import Tooltip, {
	NationalResourcesTooltipContent,
} from "../../components/Tooltip";
import VerticalScroll, {
	defaultProps as verticalScrollDefaultProps,
} from "../../components/VerticalScroll";
import TaskList, {
	IProps as TaskListProps,
} from "../../containers/TaskList/TaskList";
import GanttTaskNationalResources from "./components/GanttTaskNationalResources";
import { BarTask } from "../../types/bar-task";
import {
	convertToBarTasks,
	convertToBarTaskNR,
} from "../../helpers/bar-helper";
import { GanttEvent } from "../../types/gantt-task-actions";
import { DateSetup } from "../../types/date-setup";
import HorizontalScroll, {
	defaultProps as horizontalScrollDefaultProps,
} from "../../components/HorizontalScroll";
import { removeHiddenTasks } from "../../helpers/other-helper";
import { ROW_WIDTH } from "./constants";

// *** TYPES ***
export interface IProps extends EventOption, DisplayOption, StylingOption {
	tasks: Task[];
	multiBarRowMode?: boolean;
	// style
	bodyStyle?: React.CSSProperties;
}
export const defaultProps = {
	// style
	bodyStyle: {
		display: "flex",
		padding: "0",
		margin: "0",
		listStyle: "none",
		outline: "none",
		position: "relative",
	},
};

const GanttNationalResources = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		tasks,
		multiBarRowMode = true,
		// styles
		headerHeight = 88,
		columnWidth = 60,
		listCellWidth = "155px",
		rowHeight = 60,
		ganttHeight = 300,
		viewMode = ViewMode.Day,
		locale = "ru",
		barFill = 80,
		barCornerRadius = 3,
		barProgressColor = "#a3a3ff",
		barProgressSelectedColor = "#8282f5",
		barBackgroundColor = "#b8c2cc",
		barBackgroundSelectedColor = "#aeb8c2",
		projectProgressColor = "transparent",
		projectProgressSelectedColor = "transparent",
		projectBackgroundColor = "#338BFF",
		projectBackgroundSelectedColor = "##338BFF",
		milestoneBackgroundColor = "#f1c453",
		milestoneBackgroundSelectedColor = "#f29e4c",
		rtl = false,
		handleWidth = 10,
		timeStep = 300000,
		arrowColor = "grey",
		fontFamily = "'Abhaya Libre', Helvetica Neue, serif",
		fontSize = "14px",
		arrowIndent = 20,
		todayColor = "rgba(252, 248, 227, 0.5)",
		TooltipContent = NationalResourcesTooltipContent,
		// TaskListHeader = TaskListHeaderDefault,
		// TaskListTable = TaskListTableDefault,
		// handlers
		onDateChange,
		onProgressChange,
		onDoubleClick,
		onDelete,
		onSelect,
		onExpanderClick,
		// style
		bodyStyle,
	} = props;

	// *** USE STATE ***
	const [barTasks, setBarTasks] = useState<BarTask[]>([]);
	const [outputTasks, setOutputTasks] = useState<Task[]>([]);
	const [dateSetup, setDateSetup] = useState<DateSetup>(() => {
		const [startDate, endDate] = ganttDateRange(tasks, viewMode);
		return { viewMode, dates: seedDates(startDate, endDate, viewMode) };
	});
	const [taskHeight, setTaskHeight] = useState((rowHeight * barFill) / 100);
	const [taskListWidth, setTaskListWidth] = useState(0);
	const [svgContainerWidth, setSvgContainerWidth] = useState(0);
	const [svgContainerHeight, setSvgContainerHeight] = useState(ganttHeight);
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
	const ganttFullHeight =
		Math.min(outputTasks.length, barTasks.length) * rowHeight;

	// *** USE EFFECT ***
	useEffect(() => {
		// *** BAR TASKS ***
		let filteredBarTasks: Task[] = onExpanderClick
			? removeHiddenTasks(tasks)
			: tasks;

		const [startDate, endDate] = ganttDateRange(filteredBarTasks, viewMode);
		let newDates = seedDates(startDate, endDate, viewMode);

		if (rtl) {
			newDates = newDates.reverse();
			if (scrollX === -1) {
				setScrollX(newDates.length * columnWidth);
			}
		}

		setDateSetup({ dates: newDates, viewMode });

		setBarTasks(() =>
			convertToBarTasks(
				{
					tasks: filteredBarTasks,
					dates: newDates,
					rtl,
					multiBarRowMode,
					columnWidth,
					rowHeight,
					taskHeight,
					barCornerRadius,
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
				},
				convertToBarTaskNR
			)
		);

		// OUTPUT TASKS
		let filteredOutputTasks = onExpanderClick
			? removeHiddenTasks(tasks)
			: tasks;

		if (multiBarRowMode === true) {
			filteredOutputTasks = filteredOutputTasks.filter(
				(e, i) =>
					filteredOutputTasks.findIndex((e2) => e.line === e2.line) === i
			);
		}

		setOutputTasks(() => filteredOutputTasks);
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
		multiBarRowMode,
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
		if (wrapperRef.current) {
			setSvgContainerWidth(wrapperRef.current.offsetWidth - taskListWidth);
		}
	}, [wrapperRef, taskListWidth]);

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
		if (ganttHeight) {
			setSvgContainerHeight(ganttHeight + headerHeight);
		} else {
			setSvgContainerHeight(outputTasks.length * rowHeight + headerHeight);
		}
	}, [ganttHeight, headerHeight, rowHeight, outputTasks]);

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
		tasks: outputTasks,
		columnWidth,
		svgWidth,
		rowHeight,
		dates: dateSetup.dates,
		todayColor,
		rtl,
		// style
		gridRowLineStyle: { stroke: "transparent" },
		gridTickStyle: { stroke: "transparent" },
	};

	const calendarProps: CalendarProps = {
		dateSetup,
		locale,
		viewMode,
		headerHeight,
		columnWidth,
		rtl,
		// styles
		rootStyle: {
			fontFamily,
			fontSize,
		},
		headerStyle: {
			...calendarDefaultProps.headerStyle,
			stroke: "transparent",
		},
		bottomTextStyle: {
			fill: "#A6A9AD",
			fontFamily: fontFamily,
			fontSize: "14px",
			fontWeight: 400,
			lineHeight: "20px",
		},
		// calendar header props
		calenderHeaderLineStyle: {
			...calendarDefaultProps.calenderHeaderLineStyle,
			stroke: "#338BFF1A",
			strokeWidth: 2,
		},
		calenderHeaderTextStyle: {
			stroke: "#6A6F77",
			strokeWidth: 0.2,
			fontFamily: fontFamily,
			fontSize: "18px",
			fontWeight: 500,
			lineHeight: "24px",
		},
	};

	const barProps: ITaskGanttContentNationalResourcesProps = {
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

	const taskListProps: TaskListProps = {
		scrollY,
		// components
		TaskListHeader: TaskListHeaderDefault,
		TaskListTable: TaskListTableDefault,
		// components props
		taskListHeaderProps: {
			columns: ["Наименования"],
			// styles
			rootStyle: {
				...taskListHeaderDefaultProps.rootStyle,
				border: "none",
			},
			headerStyle: {
				...taskListHeaderDefaultProps.headerStyle,
				height: headerHeight - 2,
			},
			columnStyle: {
				...taskListHeaderDefaultProps.columnStyle,
				minWidth: ROW_WIDTH,
				textAlign: "left",
				paddingLeft: "12px",
				color: "#6A6F77",
				fontFamily: fontFamily,
				fontSize: "18px",
				fontWeight: "500",
				lineHeight: "24px",
				boxSizing: "border-box",
			},
			columnSeparatorStyle: {
				...taskListHeaderDefaultProps.columnSeparatorStyle,
				height: headerHeight * 0.5,
				marginTop: headerHeight * 0.2,
			},
		},
		taskListTableProps: {
			tasks: outputTasks,
			locale: "ru",
			onExpanderClick: handleExpanderClick,
			// TODO: BETTER TO OUTSOURCE TO SEPARATE FILE
			// BUT THERE IS NOT BUILDER FOR CUSTOM FILES TILL NOW
			expanderSymbolOpen: (
				<svg
					width="14"
					height="8"
					viewBox="0 0 14 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M13.7071 0.292893C13.3166 -0.097631 12.6834 -0.097631 12.2929 0.292893L7 5.58578L1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292894 0.292893C-0.0976306 0.683417 -0.0976306 1.31658 0.292894 1.70711L6.29289 7.7071C6.68342 8.09763 7.31658 8.09763 7.70711 7.70711L13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893Z"
						fill="#A9ADB3"
					/>
				</svg>
			),
			// TODO: BETTER TO OUTSOURCE TO SEPARATE FILE
			// BUT THERE IS NOT BUILDER FOR CUSTOM FILES TILL NOW
			expanderSymbolClose: (
				<svg
					width="8"
					height="14"
					viewBox="0 0 8 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.355353 11.8546L5.0691 6.99374L0.355353 2.13289C-0.118451 1.6443 -0.118451 0.855034 0.355353 0.366443C0.829157 -0.122148 1.59453 -0.122148 2.06834 0.366443L7.64465 6.11678C8.11845 6.60537 8.11845 7.39463 7.64465 7.88322L2.06834 13.6336C1.59453 14.1221 0.829157 14.1221 0.355353 13.6336C-0.106302 13.145 -0.118451 12.3432 0.355353 11.8546Z"
						fill="#A9ADB3"
					/>
				</svg>
			),
			// conditionals
			showStartDateColumn: false,
			showEndDateColumn: false,
			// style
			rootStyle: {
				...taskListTableDefaultProps.rootStyle,
			},
			tableRowStyle: {
				...taskListTableDefaultProps.tableRowStyle,
				height: rowHeight,
			},
			tableRowStyleProject: {
				backgroundColor: "#338BFF1A",
			},
			tableCellStyle: {
				...taskListTableDefaultProps.tableCellStyle,
				minWidth: ROW_WIDTH,
				maxWidth: ROW_WIDTH,
				color: "#6A6F77",
				fontFamily: fontFamily,
				fontSize: "14px",
				fontWeight: "500",
				lineHeight: "20px",
				boxSizing: "border-box",
			},
			tableCellStyleProject: {
				paddingLeft: "48px",
			},
			tableCellStyleTask: {
				paddingLeft: "64px",
			},
			tableCellStyleMileStone: {
				paddingLeft: "76px",
			},
			expanderStyle: {
				cursor: "pointer",
				position: "relative",
				right: "10px",
				top: "2px",
			},
		},
		// styles
		taskListTableWrapperStyles: {
			height: ganttHeight,
			overflow: "hidden",
		},
		// refs
		taskListRef,
	};

	return (
		// ROOT
		<div>
			{/* BODY */}
			<div style={bodyStyle} tabIndex={0} ref={wrapperRef}>
				{/* TASK LIST */}
				{listCellWidth && <TaskList {...taskListProps} />}

				{/* GANTT TASK */}
				<GanttTaskNationalResources
					barProps={barProps}
					gridProps={gridProps}
					calendarProps={calendarProps}
					ganttHeight={ganttHeight}
					scrollX={scrollX}
					scrollY={scrollY}
				/>

				{/* TOOLTIP */}
				{ganttEvent.changedTask && (
					<Tooltip
						task={ganttEvent.changedTask}
						rtl={rtl}
						multiBarRowMode={multiBarRowMode}
						// styles
						arrowIndent={arrowIndent}
						scrollX={scrollX}
						scrollY={scrollY}
						svgContainerHeight={svgContainerHeight}
						svgContainerWidth={svgContainerWidth}
						rowHeight={rowHeight}
						headerHeight={headerHeight}
						taskListWidth={taskListWidth}
					>
						<TooltipContent
							task={ganttEvent.changedTask}
							fontSize={"16px"}
							fontFamily={fontFamily}
						/>
					</Tooltip>
				)}

				{/* VERTICAL SCROLL */}
				<VerticalScroll
					scroll={scrollY}
					onScroll={handleScrollY}
					// style
					rootStyle={{
						...verticalScrollDefaultProps.rootStyle,
						height: ganttHeight,
						marginTop: headerHeight,
						marginLeft: rtl ? "" : "-17px",
					}}
					bodyStyle={{
						...verticalScrollDefaultProps.bodyStyle,
						height: ganttFullHeight,
					}}
				/>
			</div>

			{/* HORIZONTAL SCROLL */}
			<HorizontalScroll
				scroll={scrollX}
				onScroll={handleScrollX}
				// style
				rootStyle={{
					...horizontalScrollDefaultProps.rootStyle,
					margin: rtl
						? `0px ${taskListWidth}px 0px 0px`
						: `0px 0px 0px ${taskListWidth}px`,
				}}
				bodyStyle={{
					...horizontalScrollDefaultProps.bodyStyle,
					width: svgWidth,
				}}
			/>
		</div>
	);
};
GanttNationalResources.defaultProps = defaultProps;

export default GanttNationalResources;
