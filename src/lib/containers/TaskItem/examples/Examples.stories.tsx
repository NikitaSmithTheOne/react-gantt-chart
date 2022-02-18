// *** NPM ***
import React from "react";

// *** OTHER ***
import TaskItemOriginal, {
	IProps as ITaskItemOriginalProps,
} from "./TaskItemOriginal";
import TaskItemNationalResources from "./TaskItemNationalResources";

export default {
	title: "Examples/TaskItem",
	component: TaskItemOriginal,
};

// *** CONSTANTS ***
const TASK: ITaskItemOriginalProps["task"] = {
	index: 1,
	typeInternal: "task",
	x1: 0,
	x2: 200,
	y: 0,
	height: 50,
	progressX: 0,
	progressWidth: 100,
	barCornerRadius: 5,
	handleWidth: 10,
	barChildren: [],
	styles: {
		backgroundColor: "black",
		backgroundSelectedColor: "yellow",
		progressColor: "green",
		progressSelectedColor: "orange",
	},
	id: "1",
	name: "Test",
	start: new Date(2021, 10, 21),
	end: new Date(2021, 10, 20),
	progress: 50,
	type: "task",
	dependencies: [],
	hideChildren: true,
	isDisabled: false,
	project: undefined,
};

export const Original = () => {
	return (
		<TaskItemOriginal
			task={TASK}
			isSelected={false}
			isProgressChangeable={true}
			isDateChangeable={true}
			arrowIndent={5}
			taskHeight={50}
			isDelete={false}
			rtl={false}
			onEventStart={(...args) => console.log(args)}
		/>
	);
};

export const NationalResources = () => {
	return (
		<TaskItemNationalResources
			task={TASK}
			isSelected={false}
			isProgressChangeable={true}
			isDateChangeable={true}
			arrowIndent={5}
			taskHeight={50}
			isDelete={false}
			rtl={false}
			onEventStart={(...args) => console.log(args)}
		/>
	);
};
