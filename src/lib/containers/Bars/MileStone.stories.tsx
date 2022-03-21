// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import MileStone, {
	IProps as IMileStoneProps,
	defaultProps as mileStoneDefaultProps,
} from "./MileStone";

// *** CONSTANTS ***
const TASK: IMileStoneProps["task"] = {
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

export default {
	title: "lib/containers/Bars/MileStone",
	component: MileStone,
} as ComponentMeta<typeof MileStone>;

const Template: ComponentStory<typeof MileStone> = (args) => {
	return <MileStone {...args} />;
};

export const Original = Template.bind({});
Original.args = {
	...mileStoneDefaultProps,
	task: TASK,
	isDateChangeable: true,
	isSelected: false,
	onEventStart: (...args) => console.log(args),
};

export const Selected = Template.bind({});
Selected.args = {
	...Original.args,
	isSelected: true,
};

export const DisableDateChange = Template.bind({});
DisableDateChange.args = {
	...Original.args,
	isDateChangeable: false,
};
