// *** NPM ***
import React from "react";

// *** OTHER ***
import GridBody, { IProps as IGridBodyProps } from "./GridBody";

export default {
	title: "lib/containers/Grid/components/GridBody",
	component: GridBody,
};

// *** CONSTANTS ***
const TASKS: IGridBodyProps["tasks"] = [
	{
		start: new Date(2022, 10, 10),
		end: new Date(2022, 10, 20),
		name: "Some Project 1",
		id: "ProjectSample 1",
		progress: 25,
		type: "project",
		hideChildren: false,
	},
	{
		start: new Date(2022, 10, 11),
		end: new Date(2022, 10, 22),
		name: "Some Project 2",
		id: "ProjectSample 2",
		progress: 25,
		type: "project",
	},
	{
		start: new Date(2022, 10, 12),
		end: new Date(2022, 10, 24),
		name: "Some Project 3",
		id: "ProjectSample 3",
		progress: 25,
		type: "project",
	},
	{
		start: new Date(2022, 10, 12),
		end: new Date(2022, 10, 24),
		name: "Some Project 4",
		id: "ProjectSample 4",
		progress: 25,
		type: "project",
	},
];

export const Original = () => {
	return (
		<GridBody
			tasks={TASKS}
			dates={[
				new Date(2022, 10, 10),
				new Date(2022, 10, 11),
				new Date(2022, 10, 12),
				new Date(2022, 10, 13),
				new Date(2022, 10, 15),
				new Date(2022, 10, 16),
				new Date(2022, 10, 17),
				new Date(2022, 10, 18),
				new Date(2022, 10, 19),
				new Date(2022, 10, 20),
			]}
			svgWidth={1000}
			rowHeight={50}
			columnWidth={50}
			todayColor={""}
			rtl={false}
		></GridBody>
	);
};
