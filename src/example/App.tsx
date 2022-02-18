// *** NPM ***
import React from "react";

// *** OTHER ***
import GanttOriginal from "../lib/examples/GanttOriginal/GanttOriginal";
import GanttNationalResources from "../lib/examples/GanttNationalResources/GanttNationalResources";
import { Task, ViewMode } from "../lib/types/public-types";
import { getStartEndDateForProject, initTasks } from "./helpers";
import ViewSwitcher from "./components/ViewSwitcher";

const App = () => {
	// *** USE STATE ***
	const [tasks, setTasks] = React.useState<Task[]>(initTasks());
	const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
	const [isChecked, setIsChecked] = React.useState(true);

	// *** CONSTANTS ***
	let columnWidth = 60;
	if (view === ViewMode.Month) {
		columnWidth = 300;
	} else if (view === ViewMode.Week) {
		columnWidth = 250;
	}

	// *** HANDLERS ***
	const handleTaskChange = (task: Task) => {
		console.log("On date change Id:" + task.id);
		let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
		if (task.project) {
			const [start, end] = getStartEndDateForProject(newTasks, task.project);
			const project =
				newTasks[newTasks.findIndex((t) => t.id === task.project)];
			if (
				project.start.getTime() !== start.getTime() ||
				project.end.getTime() !== end.getTime()
			) {
				const changedProject = { ...project, start, end };
				newTasks = newTasks.map((t) =>
					t.id === task.project ? changedProject : t
				);
			}
		}
		setTasks(newTasks);
	};

	const handleTaskDelete = (task: Task) => {
		const conf = window.confirm("Are you sure about " + task.name + " ?");
		if (conf) {
			setTasks(tasks.filter((t) => t.id !== task.id));
		}
		return conf;
	};

	const handleProgressChange = async (task: Task) => {
		setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
		console.log("On progress change Id:" + task.id);
	};

	const handleDblClick = (task: Task) => {
		alert("On Double Click event Id:" + task.id);
	};

	const handleSelect = (task: Task, isSelected: boolean) => {
		console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
	};

	const handleExpanderClick = (task: Task) => {
		setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
		console.log("On expander click Id:" + task.id);
	};

	return (
		<div>
			<ViewSwitcher
				onViewModeChange={(viewMode) => setView(viewMode)}
				onViewListChange={setIsChecked}
				isChecked={isChecked}
			/>

			{/* ORIGINAL */}
			<h3>Gantt - Original</h3>
			<GanttOriginal
				tasks={tasks}
				viewMode={view}
				onDateChange={handleTaskChange}
				onDelete={handleTaskDelete}
				onProgressChange={handleProgressChange}
				onDoubleClick={handleDblClick}
				onSelect={handleSelect}
				onExpanderClick={handleExpanderClick}
				listCellWidth={isChecked ? "155px" : ""}
				columnWidth={columnWidth}
			/>

			{/* NATIONAL RESOURCES */}
			<h3>Gantt - National Resources</h3>
			<GanttNationalResources
				tasks={tasks}
				viewMode={view}
				onDateChange={handleTaskChange}
				onDelete={handleTaskDelete}
				onProgressChange={handleProgressChange}
				onDoubleClick={handleDblClick}
				onSelect={handleSelect}
				ganttHeight={450}
				onExpanderClick={handleExpanderClick}
				listCellWidth={isChecked ? "155px" : ""}
				columnWidth={columnWidth}
			/>
		</div>
	);
};

export default App;
