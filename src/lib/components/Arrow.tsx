// *** NPM ***
import React from "react";

// *** OTHER ***
import { BarTask } from "../types/bar-task";
import { OptionalKeys } from "../types/custom";

// *** HELPERS ***
const drownPathAndTriangle = ({
	taskFromIndex,
	taskFromX2,
	taskFromY,
	taskToIndex,
	taskToX1,
	taskToY,
	rowHeight,
	taskHeight,
	arrowIndent,
}: {
	taskFromIndex: number;
	taskFromX2: number;
	taskFromY: number;
	taskToIndex: number;
	taskToX1: number;
	taskToY: number;
	rowHeight: number;
	taskHeight: number;
	arrowIndent: number;
}) => {
	const indexCompare = taskFromIndex > taskToIndex ? -1 : 1;
	const taskToEndPosition = taskToY + taskHeight / 2;
	const taskFromEndPosition = taskFromX2 + arrowIndent * 2;
	const taskFromHorizontalOffsetValue =
		taskFromEndPosition < taskToX1 ? "" : `H ${taskToX1 - arrowIndent}`;
	const taskToHorizontalOffsetValue =
		taskFromEndPosition > taskToX1
			? arrowIndent
			: taskToX1 - taskFromX2 - arrowIndent;

	const path = `M ${taskFromX2} ${taskFromY + taskHeight / 2} 
  h ${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

	const trianglePoints = `${taskToX1},${taskToEndPosition} 
  ${taskToX1 - 5},${taskToEndPosition - 5} 
  ${taskToX1 - 5},${taskToEndPosition + 5}`;
	return [path, trianglePoints];
};

const drownPathAndTriangleRTL = (
	taskFrom: BarTask,
	taskTo: BarTask,
	rowHeight: number,
	taskHeight: number,
	arrowIndent: number
) => {
	const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
	const taskToEndPosition = taskTo.y + taskHeight / 2;
	const taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
	const taskFromHorizontalOffsetValue =
		taskFromEndPosition > taskTo.x2 ? "" : `H ${taskTo.x2 + arrowIndent}`;
	const taskToHorizontalOffsetValue =
		taskFromEndPosition < taskTo.x2
			? -arrowIndent
			: taskTo.x2 - taskFrom.x1 + arrowIndent;

	const path = `M ${taskFrom.x1} ${taskFrom.y + taskHeight / 2} 
  h ${-arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

	const trianglePoints = `${taskTo.x2},${taskToEndPosition} 
  ${taskTo.x2 + 5},${taskToEndPosition + 5} 
  ${taskTo.x2 + 5},${taskToEndPosition - 5}`;
	return [path, trianglePoints];
};

// *** TYPES ***
// TODO: SIMPLIFY INPUT PROPS
export interface IProps {
	taskFrom: BarTask;
	taskTo: BarTask;
	rowHeight: number;
	taskHeight: number;
	arrowIndent: number;
	rtl: boolean;
	// style
	rootStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		fill: "green",
		stroke: "green",
	},
};

const Arrow = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		arrowIndent,
		rowHeight,
		rtl,
		taskFrom,
		taskHeight,
		taskTo,
		// style
		rootStyle,
	} = props;

	// *** CONDITIONALS ***
	const [path, trianglePoints] =
		rtl === true
			? drownPathAndTriangleRTL(
					taskFrom,
					taskTo,
					rowHeight,
					taskHeight,
					arrowIndent
			  )
			: drownPathAndTriangle({
					taskFromIndex: taskFrom.index,
					taskFromX2: taskFrom.x2,
					taskFromY: taskFrom.y,
					taskToIndex: taskTo.index,
					taskToX1: taskTo.x1,
					taskToY: taskTo.y,
					rowHeight,
					taskHeight,
					arrowIndent,
			  });

	return (
		<g style={rootStyle}>
			{/* ARROW PATH */}
			<path strokeWidth="1.5" d={path} fill="none" />

			{/* ARROW TRIANGLE */}
			<polygon points={trianglePoints} />
		</g>
	);
};
Arrow.defaultProps = defaultProps;

export default Arrow;
