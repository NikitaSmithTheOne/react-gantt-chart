// *** NPM ***
import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// *** OTHER ***
import GanttOriginal, {
	defaultProps as ganttOriginalDefaultProps,
} from "./GanttOriginal";
import { initTasks } from "../../../example/helpers";
import { Task, ViewMode } from "../../types/public-types";

export default {
	title: "examples/Gantt/GanttOriginal",
	component: GanttOriginal,
} as ComponentMeta<typeof GanttOriginal>;

const Template: ComponentStory<typeof GanttOriginal> = (args) => {
	// *** USE STATE ***
	const [tasks, setTasks] = useState<Task[]>(args.tasks);

	// *** HANDLERS ***
	const handleProgressChange = async (task: Task) => {
		setTasks(() => tasks.map((t) => (t.id === task.id ? task : t)));
	};

	const handleExpanderClick = (task: Task) => {
		setTasks(() => tasks.map((t) => (t.id === task.id ? task : t)));
	};

	return (
		<GanttOriginal
			{...args}
			tasks={tasks}
			onProgressChange={handleProgressChange}
			onExpanderClick={handleExpanderClick}
		/>
	);
};

export const Original = Template.bind({});
Original.args = {
	...ganttOriginalDefaultProps,
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
	columnWidth: 220,
	listCellWidth: "155px",
};
