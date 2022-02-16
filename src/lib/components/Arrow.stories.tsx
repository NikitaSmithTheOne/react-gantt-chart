// *** NPM ***
import React from "react";
import Bar from "../containers/Bars/Bar";

// *** OTHER ***
import Arrow, { IProps as IArrowProps } from "./Arrow";

export default {
	title: "Arrow",
	component: Arrow,
};

// *** CONSTANTS ***
const TASK_FROM: IArrowProps["taskFrom"] = {
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

const TASK_TO: IArrowProps["taskTo"] = {
	index: 1,
	typeInternal: "task",
	x1: 300,
	x2: 500,
	y: 100,
	height: 50,
	progressX: 300,
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
		<svg style={{ overflow: "visible" }}>
			{/* FIRST TASK BAR */}
			<Bar
				task={TASK_FROM}
				rtl={false}
				isSelected={false}
				isDateChangeable={true}
				isProgressChangeable={true}
				onEventStart={(...args) => console.log(args)}
			></Bar>

			{/* SECOND TASK BAR */}
			<Bar
				task={TASK_TO}
				rtl={false}
				isSelected={false}
				isDateChangeable={true}
				isProgressChangeable={true}
				onEventStart={(...args) => console.log(args)}
			></Bar>

			{/* ARROW */}
			<Arrow
				taskFrom={TASK_FROM}
				taskTo={TASK_TO}
				rowHeight={50}
				taskHeight={50}
				arrowIndent={20}
				rtl={false}
			/>
		</svg>
	);
};

export const CustomColor = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			{/* FIRST TASK BAR */}
			<Bar
				task={TASK_FROM}
				rtl={false}
				isSelected={false}
				isDateChangeable={true}
				isProgressChangeable={true}
				onEventStart={(...args) => console.log(args)}
			></Bar>

			{/* SECOND TASK BAR */}
			<Bar
				task={TASK_TO}
				rtl={false}
				isSelected={false}
				isDateChangeable={true}
				isProgressChangeable={true}
				onEventStart={(...args) => console.log(args)}
			></Bar>

			{/* ARROW */}
			<Arrow
				taskFrom={TASK_FROM}
				taskTo={TASK_TO}
				rowHeight={50}
				taskHeight={50}
				arrowIndent={20}
				rtl={false}
				// style
				rootStyle={{
					fill: "red",
					stroke: "red",
				}}
			/>
		</svg>
	);
};
