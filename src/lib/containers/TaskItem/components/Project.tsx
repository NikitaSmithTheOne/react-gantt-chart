// *** NPM ***
import React from "react";

// *** OTHER ***
import { IProps as TaskItemProps } from "../examples/TaskItemOriginal";
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export type IProps = Pick<TaskItemProps, "task"> & {
	rootStyle?: React.CSSProperties;
	backgroundStyle?: React.CSSProperties;
	progressStyle?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	// style
	rootStyle: {
		cursor: "pointer",
		outline: "none",
	},
	backgroundStyle: {
		userSelect: "none",
		opacity: 0.6,
		fill: "orange",
	},
	progressStyle: {
		fill: "green",
	},
};

const Project = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		task,
		// style
		rootStyle,
		backgroundStyle,
		progressStyle,
	} = props;

	return (
		<svg>
			<g tabIndex={0} style={rootStyle}>
				{/* BACKGROUND */}
				<rect
					style={backgroundStyle}
					x={task.x1}
					y={task.y}
					height={task.height}
					width={task.x2 - task.x1}
					rx={task.barCornerRadius}
					ry={task.barCornerRadius}
				/>

				{/* PROGRESS */}
				<rect
					style={progressStyle}
					x={task.progressX}
					y={task.y}
					height={task.height}
					width={task.progressWidth}
					rx={task.barCornerRadius}
					ry={task.barCornerRadius}
				/>
			</g>
		</svg>
	);
};
Project.defaultProps = defaultProps;

export default Project;
