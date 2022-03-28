// *** NPM ***
import React, { memo } from "react";

// *** OTHER ***
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

const drownPathAndTriangleRTL = ({
	taskFromIndex,
	taskFromX1,
	taskFromY,
	taskToIndex,
	taskToX2,
	taskToY,
	rowHeight,
	taskHeight,
	arrowIndent,
}: {
	taskFromIndex: number;
	taskFromX1: number;
	taskFromY: number;
	taskToIndex: number;
	taskToX2: number;
	taskToY: number;
	rowHeight: number;
	taskHeight: number;
	arrowIndent: number;
}) => {
	const indexCompare = taskFromIndex > taskToIndex ? -1 : 1;
	const taskToEndPosition = taskToY + taskHeight / 2;
	const taskFromEndPosition = taskFromX1 - arrowIndent * 2;
	const taskFromHorizontalOffsetValue =
		taskFromEndPosition > taskToX2 ? "" : `H ${taskToX2 + arrowIndent}`;
	const taskToHorizontalOffsetValue =
		taskFromEndPosition < taskToX2
			? -arrowIndent
			: taskToX2 - taskFromX1 + arrowIndent;

	const path = `M ${taskFromX1} ${taskFromY + taskHeight / 2} 
  h ${-arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

	const trianglePoints = `${taskToX2},${taskToEndPosition} 
  ${taskToX2 + 5},${taskToEndPosition + 5} 
  ${taskToX2 + 5},${taskToEndPosition - 5}`;
	return [path, trianglePoints];
};

// *** TYPES ***
// TODO: SIMPLIFY INPUT PROPS
export interface IProps {
	taskFromIndex: number;
	taskFromX1: number;
	taskFromX2: number;
	taskFromY: number;
	taskToIndex: number;
	taskToX1: number;
	taskToX2: number;
	taskToY: number;
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
		taskFromIndex,
		taskFromX1,
		taskFromX2,
		taskFromY,
		taskToIndex,
		taskToX1,
		taskToX2,
		taskToY,
		rowHeight,
		taskHeight,
		arrowIndent,
		rtl,
		// style
		rootStyle,
	} = props;

	// *** CONDITIONALS ***
	const [path, trianglePoints] =
		rtl === true
			? drownPathAndTriangleRTL({
					taskFromIndex: taskFromIndex,
					taskFromX1: taskFromX1,
					taskFromY: taskFromY,
					taskToIndex: taskToIndex,
					taskToX2: taskToX2,
					taskToY: taskToY,
					rowHeight,
					taskHeight,
					arrowIndent,
			  })
			: drownPathAndTriangle({
					taskFromIndex: taskFromIndex,
					taskFromX2: taskFromX2,
					taskFromY: taskFromY,
					taskToIndex: taskToIndex,
					taskToX1: taskToX1,
					taskToY: taskToY,
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

// TODO: HANDLE MEMO OF ROOT STYLE???
export default memo(Arrow);
