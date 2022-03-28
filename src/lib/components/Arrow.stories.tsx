// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import Arrow from "./Arrow";
import Bar from "../containers/Bars/Bar";
import { BarDisplay } from "../containers";
import { BarTask } from "../../../library";

// *** CONSTANTS ***
const TASK_FROM: BarTask = {
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

const TASK_TO: BarTask = {
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

export default {
	title: "lib/components/Arrow",
	component: Arrow,
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = (args) => {
	return (
		<svg style={{ overflow: "visible" }}>
			{/* FIRST TASK BAR */}
			<Bar
				rtl={false}
				isDateChangeable={true}
				isProgressChangeable={true}
				barDisplay={
					<BarDisplay
						x={args.taskFromX1}
						y={args.taskFromY}
						progressX={args.taskFromX1}
					/>
				}
			/>

			{/* SECOND TASK BAR */}
			<Bar
				rtl={false}
				isDateChangeable={true}
				isProgressChangeable={true}
				barDisplay={
					<BarDisplay
						x={args.taskToX1}
						y={args.taskToY}
						progressX={args.taskToX1}
					/>
				}
			/>

			<Arrow {...args}></Arrow>
		</svg>
	);
};

export const Original = Template.bind({});
Original.args = {
	taskFromIndex: TASK_FROM.index,
	taskFromX1: TASK_FROM.x1,
	taskFromX2: TASK_FROM.x2,
	taskFromY: TASK_FROM.y,
	taskToIndex: TASK_TO.index,
	taskToX1: TASK_TO.x1,
	taskToX2: TASK_TO.x2,
	taskToY: TASK_TO.y,
	rowHeight: 100,
	taskHeight: 50,
	arrowIndent: 20,
	rtl: false,
};

export const RedColor = Template.bind({});
RedColor.args = {
	...Original.args,
	rootStyle: {
		fill: "red",
		stroke: "red",
	},
};

export const OrangeColor = Template.bind({});
OrangeColor.args = {
	...Original.args,
	rootStyle: {
		fill: "orange",
		stroke: "orange",
	},
};

export const TruthyRTL = Template.bind({});
TruthyRTL.args = {
	...Original.args,
	rtl: true,
};
