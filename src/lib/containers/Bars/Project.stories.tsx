// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import Project, {
	IProps as IProjectProps,
	defaultProps as projectDefaultProps,
} from "./Project";

// *** CONSTANTS ***
const TASK: IProjectProps["task"] = {
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
	title: "lib/containers/Bars/Project",
	component: Project,
} as ComponentMeta<typeof Project>;

const Template: ComponentStory<typeof Project> = (args) => {
	return <Project {...args} />;
};

export const Original = Template.bind({});
Original.args = {
	...projectDefaultProps,
	task: TASK,
};
