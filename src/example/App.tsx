// *** NPM ***
import React from "react";
import {
	GanttOriginal,
	GanttNationalResources,
	Task,
	ViewMode,
} from "react-gantt-chart";

// *** OTHER ***
import ViewSwitcher from "./components/ViewSwitcher";
import { getStartEndDateForProject, initTasks } from "./helpers";

const App = () => {
	// *** USE STATE ***
	const [tasks, setTasks] = React.useState<Task[]>(initTasks());
	const [view, setView] = React.useState<ViewMode>(ViewMode.Month);
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

		setTasks(() => newTasks);
	};

	const handleTaskDelete = (task: Task) => {
		const conf = window.confirm("Are you sure about " + task.name + " ?");
		if (conf) {
			setTasks(() => tasks.filter((t) => t.id !== task.id));
		}
		return conf;
	};

	const handleProgressChange = async (task: Task) => {
		console.log("On progress change Id:" + task.id);
		setTasks(() => tasks.map((t) => (t.id === task.id ? task : t)));
	};

	const handleDblClick = (task: Task) => {
		console.log("On Double Click event Id:" + task.id);
	};

	const handleSelect = (task: Task, isSelected: boolean) => {
		console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
	};

	const handleExpanderClick = (task: Task) => {
		console.log("On expander click Id:" + task.id);
		setTasks(() => tasks.map((t) => (t.id === task.id ? task : t)));
	};

	return (
		<div>
			<ViewSwitcher
				onViewModeChange={(viewMode) => setView(() => viewMode)}
				onViewListChange={setIsChecked}
				isChecked={isChecked}
			/>

			{/* ORIGINAL */}
			<h3>Gantt - Original</h3>
			<GanttOriginal
				tasks={tasks}
				viewMode={view}
				// handlers
				onDateChange={handleTaskChange}
				onDelete={handleTaskDelete}
				onProgressChange={handleProgressChange}
				onDoubleClick={handleDblClick}
				onSelect={handleSelect}
				onExpanderClick={handleExpanderClick}
				// styles
				listCellWidth={isChecked ? "155px" : ""}
				columnWidth={columnWidth}
			/>

			{/* NATIONAL RESOURCES */}
			<h3>Gantt - National Resources - Multi Bar Row</h3>
			<GanttNationalResources
				tasks={tasks}
				viewMode={view}
				multiBarRowMode={true}
				// handlers
				onDateChange={() => console.log("onDateChange is not implemented")}
				onDelete={() => console.log("onDelete in not implemented")}
				onProgressChange={handleProgressChange}
				onDoubleClick={() => console.log("onDoubleClick is not implemented")}
				onSelect={() => console.log("onSelect is not implemented")}
				onExpanderClick={handleExpanderClick}
				// styles
				ganttHeight={480}
				listCellWidth={isChecked ? "155px" : ""}
				columnWidth={220}
			/>

			<h3>Gantt - National Resources</h3>
			<GanttNationalResources
				tasks={tasks}
				viewMode={view}
				// handlers
				onDateChange={() => console.log("onDateChange is not implemented")}
				onDelete={() => console.log("onDelete in not implemented")}
				onProgressChange={handleProgressChange}
				onDoubleClick={() => console.log("onDoubleClick is not implemented")}
				onSelect={() => console.log("onSelect is not implemented")}
				onExpanderClick={handleExpanderClick}
				// styles
				ganttHeight={550}
				listCellWidth={isChecked ? "155px" : ""}
				columnWidth={220}
			/>
		</div>
	);
};

export default App;
