// *** NPM ***
import React from "react";
import ReactDOM from "react-dom";

// *** OTHER ***
import GanttOriginal from "./GanttOriginal";
import { initTasks } from "../../../example/helpers";

describe("[GanttOriginal.tsx] Render", () => {
	it("Renders w/o errors", () => {
		const tasks = initTasks();
		const div = document.createElement("div");
		ReactDOM.render(<GanttOriginal tasks={tasks} />, div);
	});
});
