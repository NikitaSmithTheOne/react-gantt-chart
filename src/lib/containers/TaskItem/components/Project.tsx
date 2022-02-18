// *** NPM ***
import React from "react";

// *** OTHER ***
import { IProps as TaskItemProps } from "../examples/TaskItemOriginal";
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export type IProps = {
	rootStyle?: React.CSSProperties;
	backgroundStyle?: React.CSSProperties;
	topStyle?: React.CSSProperties;
} & Pick<TaskItemProps, "task" | "isSelected">;
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		cursor: "pointer",
		outline: "none",
	},
	backgroundStyle: {
		userSelect: "none",
		opacity: 0.6,
	},
	topStyle: {
		userSelect: "none",
	},
};

const Project = (props: IProps) => {
	// *** PROPS ***
	const { task, isSelected, rootStyle, backgroundStyle, topStyle } = props;

	// *** CONDITIONALS ****
	const barColor = isSelected
		? task.styles.backgroundSelectedColor
		: task.styles.backgroundColor;
	const processColor = isSelected
		? task.styles.progressSelectedColor
		: task.styles.progressColor;
	const projectWith = task.x2 - task.x1;

	const projectLeftTriangle = [
		task.x1,
		task.y + task.height / 2 - 1,
		task.x1,
		task.y + task.height,
		task.x1 + 15,
		task.y + task.height / 2 - 1,
	].join(",");

	const projectRightTriangle = [
		task.x2,
		task.y + task.height / 2 - 1,
		task.x2,
		task.y + task.height,
		task.x2 - 15,
		task.y + task.height / 2 - 1,
	].join(",");

	return (
		<svg>
			<g tabIndex={0} style={rootStyle}>
				<rect
					style={backgroundStyle}
					fill={barColor}
					x={task.x1}
					width={projectWith}
					y={task.y}
					height={task.height}
					rx={task.barCornerRadius}
					ry={task.barCornerRadius}
				/>
				<rect
					fill={processColor}
					x={task.progressX}
					width={task.progressWidth}
					y={task.y}
					height={task.height}
					ry={task.barCornerRadius}
					rx={task.barCornerRadius}
				/>
				<rect
					style={topStyle}
					fill={barColor}
					x={task.x1}
					width={projectWith}
					y={task.y}
					height={task.height / 2}
					rx={task.barCornerRadius}
					ry={task.barCornerRadius}
				/>
				<polygon
					style={topStyle}
					fill={barColor}
					points={projectLeftTriangle}
				/>
				<polygon
					style={topStyle}
					fill={barColor}
					points={projectRightTriangle}
				/>
			</g>
		</svg>
	);
};

export default Project;
