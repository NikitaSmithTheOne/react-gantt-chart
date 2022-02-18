// *** NPM ***
import React from "react";

// *** OTHER ***
import Bar from "../Bar";
import BarOriginal, {
	IProps as IBarOriginalProps,
} from "../examples/BarOriginal";
import BarNationalResources from "../examples/BarNationalResources";

export default {
	title: "Examples/Bar",
	component: Bar,
};

// *** CONSTANTS ***
const TASK: IBarOriginalProps["task"] = {
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
		<BarOriginal
			task={TASK}
			rtl={false}
			onEventStart={() => console.warn("not implemented")}
			isDateChangeable={true}
		/>
	);
};

export const NationalResources = () => {
	return (
		<BarNationalResources
			task={TASK}
			rtl={false}
			onEventStart={() => console.warn("not implemented")}
			isDateChangeable={true}
		/>
	);
};
