// *** NPM ***
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import GanttNationalResources, {
	defaultProps as ganttNationalResourcesDefaultProps,
} from "./GanttNationalResources";
import { initTasks } from "../../../example/helpers";
import { Task, ViewMode } from "../../types/public-types";

export default {
	title: "examples/Gantt/GanttNationalResources",
	component: GanttNationalResources,
} as ComponentMeta<typeof GanttNationalResources>;

const Template: ComponentStory<typeof GanttNationalResources> = (args) => {
	// *** USE STATE ***
	const [tasks, setTasks] = React.useState<Task[]>(args.tasks);

	// *** HANDLERS ***
	const handleProgressChange = async (task: Task) => {
		setTasks(() => tasks.map((t) => (t.id === task.id ? task : t)));
	};

	const handleExpanderClick = (task: Task) => {
		setTasks(() => tasks.map((t) => (t.id === task.id ? task : t)));
	};

	return (
		<GanttNationalResources
			{...args}
			tasks={tasks}
			onProgressChange={handleProgressChange}
			onExpanderClick={handleExpanderClick}
		/>
	);
};

export const Original = Template.bind({});
Original.args = {
	...ganttNationalResourcesDefaultProps,
	tasks: initTasks(),
	viewMode: ViewMode.Month,
	// handlers
	onDateChange: () => console.log("onDateChange is not implemented"),
	onDelete: () => console.log("onDelete in not implemented"),
	// onProgressChange: (...args) => console.log(args)
	onDoubleClick: () => console.log("onDoubleClick is not implemented"),
	onSelect: () => console.log("onSelect is not implemented"),
	onExpanderClick: (...args) => console.log(args),
	// styles
	ganttHeight: 480,
	listCellWidth: "155px",
	columnWidth: 220,
};

export const MultiBarRow = Template.bind({});
MultiBarRow.args = {
	...Original.args,
	multiBarRowMode: true,
};
