// *** NPM ***
import React from "react";

// *** OTHER ***
import { IProps as TaskItemProps } from "../examples/TaskItemOriginal";
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export type IProps = {
	rootStyle?: React.CSSProperties;
	backgroundStyle?: React.CSSProperties;
} & Pick<
	TaskItemProps,
	"task" | "isDateChangeable" | "isSelected" | "onEventStart"
>;
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		cursor: "pointer",
		outline: "none",
	},
	backgroundStyle: {
		userSelect: "none",
	},
};

const MileStone = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		// general
		task,
		// checkers
		isDateChangeable,
		isSelected,
		// handlers
		onEventStart,
		// styles
		rootStyle,
		backgroundStyle,
	} = props;

	// *** CONDITIONALS ***
	const transform = `rotate(45 ${task.x1 + task.height * 0.356} 
    ${task.y + task.height * 0.85})`;

	return (
		<svg>
			{/* ROOT */}
			<g tabIndex={0} style={rootStyle}>
				{/* BACKGROUND */}
				<rect
					style={backgroundStyle}
					fill={
						isSelected
							? task.styles.backgroundSelectedColor
							: task.styles.backgroundColor
					}
					x={task.x1}
					width={task.height}
					y={task.y}
					height={task.height}
					rx={task.barCornerRadius}
					ry={task.barCornerRadius}
					transform={transform}
					onMouseDown={(e) => {
						isDateChangeable && onEventStart("move", task, e);
					}}
				/>
			</g>
		</svg>
	);
};
MileStone.defaultProps = defaultProps;

export default MileStone;
