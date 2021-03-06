// *** OTHER ***
import { Task, TaskType } from "../types/public-types";
import { BarTask, TaskTypeInternal } from "../types/bar-task";
import { BarMoveAction } from "../types/gantt-task-actions";

// *** TYPES ***
export interface IConvertToBarTasksArgs {
	tasks: Task[];
	dates: Date[];
	rtl: boolean;
	multiBarRowMode?: boolean;
	// styles
	columnWidth: number;
	rowHeight: number;
	taskHeight: number;
	barCornerRadius: number;
	handleWidth: number;
	// task bar
	barProgressColor: string;
	barProgressSelectedColor: string;
	barBackgroundColor: string;
	barBackgroundSelectedColor: string;
	// project
	projectProgressColor: string;
	projectProgressSelectedColor: string;
	projectBackgroundColor: string;
	projectBackgroundSelectedColor: string;
	// milestone
	milestoneBackgroundColor: string;
	milestoneBackgroundSelectedColor: string;
}

export type IConvertToBarTaskArgs = {
	task: Task;
	taskIndex: number;
	dateDelta: number;
} & Exclude<IConvertToBarTasksArgs, "tasks">;

export const convertToBarTasks = (
	args: IConvertToBarTasksArgs,
	conversion: (args: IConvertToBarTaskArgs) => BarTask = convertToBarTask
) => {
	const { tasks, dates } = args;

	const dateDelta =
		dates[1].getTime() -
		dates[0].getTime() -
		dates[1].getTimezoneOffset() * 60 * 1000 +
		dates[0].getTimezoneOffset() * 60 * 1000;

	let barTasks = tasks.map((task, index) => {
		return conversion({
			...args,
			task: task,
			taskIndex: index,
			dateDelta: dateDelta,
		});
	});

	// set dependencies
	barTasks = barTasks.map((task) => {
		const dependencies = task.dependencies || [];

		for (let j = 0; j < dependencies.length; j++) {
			const dependence = barTasks.findIndex(
				(value) => value.id === dependencies[j]
			);

			if (dependence !== -1) barTasks[dependence].barChildren.push(task);
		}

		return task;
	});

	return barTasks;
};

export const convertToBarTask = (args: IConvertToBarTaskArgs): BarTask => {
	const map: { [key in TaskType]: BarTask } = {
		task: convertToBar({ ...args }),
		milestone: convertToMilestone({ ...args }),
		project: convertToProject({ ...args }),
	};

	return map[args.task.type];
};

export const convertToBarTaskNR = (args: IConvertToBarTaskArgs): BarTask => {
	const map: { [key in TaskType]: BarTask } = {
		task: convertToBar({ ...args }),
		milestone: convertToBar({ ...args }),
		project: convertToProject({ ...args }),
	};

	return map[args.task.type];
};

export const convertToBar = (args: IConvertToBarTaskArgs): BarTask => {
	const {
		task,
		taskIndex,
		dates,
		dateDelta,
		rtl,
		multiBarRowMode,
		// style
		columnWidth,
		rowHeight,
		taskHeight,
		barCornerRadius,
		handleWidth,
		barProgressColor,
		barProgressSelectedColor,
		barBackgroundColor,
		barBackgroundSelectedColor,
	} = args;

	let x1: number;
	let x2: number;

	if (rtl) {
		x2 = taskXCoordinateRTL(task.start, dates, dateDelta, columnWidth);
		x1 = taskXCoordinateRTL(task.end, dates, dateDelta, columnWidth);
	} else {
		x1 = taskXCoordinate(task.start, dates, dateDelta, columnWidth);
		x2 = taskXCoordinate(task.end, dates, dateDelta, columnWidth);
	}

	let typeInternal: TaskTypeInternal = task.type;

	if (typeInternal === "task" && x2 - x1 < handleWidth * 2) {
		typeInternal = "smalltask";
		x2 = x1 + handleWidth * 2;
	}

	const [progressWidth, progressX] = progressWithByParams(
		x1,
		x2,
		task.progress,
		rtl
	);
	const customIndex: number =
		multiBarRowMode === true && typeof task.line !== "undefined"
			? task.line
			: taskIndex;
	const y = taskYCoordinate(customIndex, rowHeight, taskHeight);
	const hideChildren = task.type === "project" ? task.hideChildren : undefined;

	const styles = {
		backgroundColor: barBackgroundColor,
		backgroundSelectedColor: barBackgroundSelectedColor,
		progressColor: barProgressColor,
		progressSelectedColor: barProgressSelectedColor,
		...task.styles,
	};

	return {
		...task,
		typeInternal,
		x1,
		x2,
		y,
		index: taskIndex,
		progressX,
		progressWidth,
		barCornerRadius,
		handleWidth,
		hideChildren,
		height: taskHeight,
		barChildren: [],
		styles,
	};
};

export const convertToProject = (args: IConvertToBarTaskArgs): BarTask => {
	const {
		task,
		taskIndex,
		dates,
		dateDelta,
		rtl,
		multiBarRowMode,
		// style
		columnWidth,
		rowHeight,
		taskHeight,
		barCornerRadius,
		handleWidth,
		// project styles
		projectProgressColor,
		projectProgressSelectedColor,
		projectBackgroundColor,
		projectBackgroundSelectedColor,
	} = args;

	let x1: number;
	let x2: number;

	if (rtl) {
		x2 = taskXCoordinateRTL(task.start, dates, dateDelta, columnWidth);
		x1 = taskXCoordinateRTL(task.end, dates, dateDelta, columnWidth);
	} else {
		x1 = taskXCoordinate(task.start, dates, dateDelta, columnWidth);
		x2 = taskXCoordinate(task.end, dates, dateDelta, columnWidth);
	}

	let typeInternal: TaskTypeInternal = task.type;

	if (typeInternal === "task" && x2 - x1 < handleWidth * 2) {
		typeInternal = "smalltask";
		x2 = x1 + handleWidth * 2;
	}

	const [progressWidth, progressX] = progressWithByParams(
		x1,
		x2,
		task.progress,
		rtl
	);
	const customIndex: number =
		multiBarRowMode === true && typeof task.line !== "undefined"
			? task.line
			: taskIndex;
	const y = taskYCoordinate(customIndex, rowHeight, taskHeight);
	const hideChildren = task.type === "project" ? task.hideChildren : undefined;

	const styles = {
		backgroundColor: projectBackgroundColor,
		backgroundSelectedColor: projectBackgroundSelectedColor,
		progressColor: projectProgressColor,
		progressSelectedColor: projectProgressSelectedColor,
		...task.styles,
	};

	return {
		...task,
		typeInternal,
		x1,
		x2,
		y,
		index: taskIndex,
		progressX,
		progressWidth,
		barCornerRadius,
		handleWidth,
		hideChildren,
		height: taskHeight,
		barChildren: [],
		styles,
	};
};

export const convertToMilestone = (args: IConvertToBarTaskArgs): BarTask => {
	const {
		task,
		taskIndex,
		dates,
		dateDelta,
		multiBarRowMode,
		// styles
		columnWidth,
		rowHeight,
		taskHeight,
		barCornerRadius,
		handleWidth,
		// milestone
		milestoneBackgroundColor,
		milestoneBackgroundSelectedColor,
	} = args;

	const x = taskXCoordinate(task.start, dates, dateDelta, columnWidth);
	const customIndex: number =
		multiBarRowMode === true && typeof task.line !== "undefined"
			? task.line
			: taskIndex;
	const y = taskYCoordinate(customIndex, rowHeight, taskHeight);

	const x1 = x - taskHeight * 0.5;
	const x2 = x + taskHeight * 0.5;

	const rotatedHeight = taskHeight / 1.414;
	const styles = {
		backgroundColor: milestoneBackgroundColor,
		backgroundSelectedColor: milestoneBackgroundSelectedColor,
		progressColor: "",
		progressSelectedColor: "",
		...task.styles,
	};

	return {
		...task,
		end: task.start,
		x1,
		x2,
		y,
		index: taskIndex,
		progressX: 0,
		progressWidth: 0,
		barCornerRadius,
		handleWidth,
		typeInternal: task.type,
		progress: 0,
		height: rotatedHeight,
		hideChildren: undefined,
		barChildren: [],
		styles,
	};
};

const taskXCoordinate = (
	xDate: Date,
	dates: Date[],
	dateDelta: number,
	columnWidth: number
) => {
	const index = ~~(
		(xDate.getTime() -
			dates[0].getTime() +
			xDate.getTimezoneOffset() -
			dates[0].getTimezoneOffset()) /
		dateDelta
	);
	const x = Math.round(
		(index +
			(xDate.getTime() -
				dates[index].getTime() -
				xDate.getTimezoneOffset() * 60 * 1000 +
				dates[index].getTimezoneOffset() * 60 * 1000) /
				dateDelta) *
			columnWidth
	);
	return x;
};
const taskXCoordinateRTL = (
	xDate: Date,
	dates: Date[],
	dateDelta: number,
	columnWidth: number
) => {
	let x = taskXCoordinate(xDate, dates, dateDelta, columnWidth);
	x += columnWidth;
	return x;
};
const taskYCoordinate = (
	index: number,
	rowHeight: number,
	taskHeight: number
) => {
	const y = index * rowHeight + (rowHeight - taskHeight) / 2;
	return y;
};

export const progressWithByParams = (
	taskX1: number,
	taskX2: number,
	progress: number,
	rtl: boolean
) => {
	const progressWidth = (taskX2 - taskX1) * progress * 0.01;
	let progressX: number;
	if (rtl) {
		progressX = taskX2 - progressWidth;
	} else {
		progressX = taskX1;
	}
	return [progressWidth, progressX];
};

export const progressByProgressWidth = (
	progressWidth: number,
	barTask: BarTask
) => {
	const barWidth = barTask.x2 - barTask.x1;
	const progressPercent = Math.round((progressWidth * 100) / barWidth);
	if (progressPercent >= 100) return 100;
	else if (progressPercent <= 0) return 0;
	else return progressPercent;
};

const progressByX = (x: number, task: BarTask) => {
	if (x >= task.x2) return 100;
	else if (x <= task.x1) return 0;
	else {
		const barWidth = task.x2 - task.x1;
		const progressPercent = Math.round(((x - task.x1) * 100) / barWidth);
		return progressPercent;
	}
};
const progressByXRTL = (x: number, task: BarTask) => {
	if (x >= task.x2) return 0;
	else if (x <= task.x1) return 100;
	else {
		const barWidth = task.x2 - task.x1;
		const progressPercent = Math.round(((task.x2 - x) * 100) / barWidth);
		return progressPercent;
	}
};

export const getProgressPoint = (
	progressX: number,
	taskY: number,
	taskHeight: number
) => {
	const point = [
		progressX - 5,
		taskY + taskHeight,
		progressX + 5,
		taskY + taskHeight,
		progressX,
		taskY + taskHeight - 8.66,
	];
	return point.join(",");
};

const startByX = (x: number, xStep: number, task: BarTask) => {
	if (x >= task.x2 - task.handleWidth * 2) {
		x = task.x2 - task.handleWidth * 2;
	}
	const steps = Math.round((x - task.x1) / xStep);
	const additionalXValue = steps * xStep;
	const newX = task.x1 + additionalXValue;
	return newX;
};

const endByX = (x: number, xStep: number, task: BarTask) => {
	if (x <= task.x1 + task.handleWidth * 2) {
		x = task.x1 + task.handleWidth * 2;
	}
	const steps = Math.round((x - task.x2) / xStep);
	const additionalXValue = steps * xStep;
	const newX = task.x2 + additionalXValue;
	return newX;
};

const moveByX = (x: number, xStep: number, task: BarTask) => {
	const steps = Math.round((x - task.x1) / xStep);
	const additionalXValue = steps * xStep;
	const newX1 = task.x1 + additionalXValue;
	const newX2 = newX1 + task.x2 - task.x1;
	return [newX1, newX2];
};

const dateByX = (
	x: number,
	taskX: number,
	taskDate: Date,
	xStep: number,
	timeStep: number
) => {
	let newDate = new Date(((x - taskX) / xStep) * timeStep + taskDate.getTime());
	newDate = new Date(
		newDate.getTime() +
			(newDate.getTimezoneOffset() - taskDate.getTimezoneOffset()) * 60000
	);
	return newDate;
};

/**
 * Method handles event in real time(mousemove) and on finish(mouseup)
 */
export const handleTaskBySVGMouseEvent = (
	svgX: number,
	action: BarMoveAction,
	selectedTask: BarTask,
	xStep: number,
	timeStep: number,
	initEventX1Delta: number,
	rtl: boolean
): { isChanged: boolean; changedTask: BarTask } => {
	let result: { isChanged: boolean; changedTask: BarTask };
	switch (selectedTask.type) {
		case "milestone":
			result = handleTaskBySVGMouseEventForMilestone(
				svgX,
				action,
				selectedTask,
				xStep,
				timeStep,
				initEventX1Delta
			);
			break;
		default:
			result = handleTaskBySVGMouseEventForBar(
				svgX,
				action,
				selectedTask,
				xStep,
				timeStep,
				initEventX1Delta,
				rtl
			);
			break;
	}
	return result;
};

const handleTaskBySVGMouseEventForBar = (
	svgX: number,
	action: BarMoveAction,
	selectedTask: BarTask,
	xStep: number,
	timeStep: number,
	initEventX1Delta: number,
	rtl: boolean
): { isChanged: boolean; changedTask: BarTask } => {
	const changedTask: BarTask = { ...selectedTask };
	let isChanged = false;
	switch (action) {
		case "progress":
			if (rtl) {
				changedTask.progress = progressByXRTL(svgX, selectedTask);
			} else {
				changedTask.progress = progressByX(svgX, selectedTask);
			}
			isChanged = changedTask.progress !== selectedTask.progress;
			if (isChanged) {
				const [progressWidth, progressX] = progressWithByParams(
					changedTask.x1,
					changedTask.x2,
					changedTask.progress,
					rtl
				);
				changedTask.progressWidth = progressWidth;
				changedTask.progressX = progressX;
			}
			break;
		case "start": {
			const newX1 = startByX(svgX, xStep, selectedTask);
			changedTask.x1 = newX1;
			isChanged = changedTask.x1 !== selectedTask.x1;
			if (isChanged) {
				if (rtl) {
					changedTask.end = dateByX(
						newX1,
						selectedTask.x1,
						selectedTask.end,
						xStep,
						timeStep
					);
				} else {
					changedTask.start = dateByX(
						newX1,
						selectedTask.x1,
						selectedTask.start,
						xStep,
						timeStep
					);
				}
				const [progressWidth, progressX] = progressWithByParams(
					changedTask.x1,
					changedTask.x2,
					changedTask.progress,
					rtl
				);
				changedTask.progressWidth = progressWidth;
				changedTask.progressX = progressX;
			}
			break;
		}
		case "end": {
			const newX2 = endByX(svgX, xStep, selectedTask);
			changedTask.x2 = newX2;
			isChanged = changedTask.x2 !== selectedTask.x2;
			if (isChanged) {
				if (rtl) {
					changedTask.start = dateByX(
						newX2,
						selectedTask.x2,
						selectedTask.start,
						xStep,
						timeStep
					);
				} else {
					changedTask.end = dateByX(
						newX2,
						selectedTask.x2,
						selectedTask.end,
						xStep,
						timeStep
					);
				}
				const [progressWidth, progressX] = progressWithByParams(
					changedTask.x1,
					changedTask.x2,
					changedTask.progress,
					rtl
				);
				changedTask.progressWidth = progressWidth;
				changedTask.progressX = progressX;
			}
			break;
		}
		case "move": {
			const [newMoveX1, newMoveX2] = moveByX(
				svgX - initEventX1Delta,
				xStep,
				selectedTask
			);
			isChanged = newMoveX1 !== selectedTask.x1;
			if (isChanged) {
				changedTask.start = dateByX(
					newMoveX1,
					selectedTask.x1,
					selectedTask.start,
					xStep,
					timeStep
				);
				changedTask.end = dateByX(
					newMoveX2,
					selectedTask.x2,
					selectedTask.end,
					xStep,
					timeStep
				);
				changedTask.x1 = newMoveX1;
				changedTask.x2 = newMoveX2;
				const [progressWidth, progressX] = progressWithByParams(
					changedTask.x1,
					changedTask.x2,
					changedTask.progress,
					rtl
				);
				changedTask.progressWidth = progressWidth;
				changedTask.progressX = progressX;
			}
			break;
		}
	}
	return { isChanged, changedTask };
};

const handleTaskBySVGMouseEventForMilestone = (
	svgX: number,
	action: BarMoveAction,
	selectedTask: BarTask,
	xStep: number,
	timeStep: number,
	initEventX1Delta: number
): { isChanged: boolean; changedTask: BarTask } => {
	const changedTask: BarTask = { ...selectedTask };
	let isChanged = false;
	switch (action) {
		case "move": {
			const [newMoveX1, newMoveX2] = moveByX(
				svgX - initEventX1Delta,
				xStep,
				selectedTask
			);
			isChanged = newMoveX1 !== selectedTask.x1;
			if (isChanged) {
				changedTask.start = dateByX(
					newMoveX1,
					selectedTask.x1,
					selectedTask.start,
					xStep,
					timeStep
				);
				changedTask.end = changedTask.start;
				changedTask.x1 = newMoveX1;
				changedTask.x2 = newMoveX2;
			}
			break;
		}
	}
	return { isChanged, changedTask };
};
