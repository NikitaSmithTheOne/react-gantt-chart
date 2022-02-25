// *** NPM ***
import React from "react";

// *** OTHER ***
import Tooltip, {
	IProps as ITooltipProps,
	StandardTooltipContent,
} from "./Tooltip";

export default {
	title: "lib/components/Tooltip",
	component: Tooltip,
};

// *** CONSTANTS ***
const TASK: ITooltipProps["task"] = {
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

export const Original = () => {
	return (
		<Tooltip
			task={TASK}
			arrowIndent={0}
			rtl={false}
			svgContainerHeight={110}
			svgContainerWidth={250}
			headerHeight={0}
			taskListWidth={0}
			scrollX={0}
			scrollY={0}
			rowHeight={0}
		>
			<StandardTooltipContent
				task={TASK}
				fontSize={""}
				fontFamily={""}
			></StandardTooltipContent>
		</Tooltip>
	);
};
