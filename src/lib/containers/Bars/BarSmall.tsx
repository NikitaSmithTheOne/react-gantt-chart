// *** NPM ***
import React, { useState } from "react";

// *** OTHER ***
import { getProgressPoint } from "../../helpers/bar-helper";
import BarDisplay, {
	defaultProps as barDisplayDefaultProps,
} from "./components/BarDisplay";
import BarProgressHandle from "./components/BarProgressHandle";
import { IProps as TaskItemProps } from "../TaskItem/TaskItem";
import { OptionalKeys } from "../../types/custom";

// *** TYPES ***
type IProps = {
	rootStyle?: React.CSSProperties;
} & Pick<
	TaskItemProps,
	"task" | "isDateChangeable" | "isProgressChangeable" | "onEventStart"
>;
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

const defaultProps: TOptionalProps = {
	rootStyle: {
		cursor: "pointer",
		outline: "none",
	},
};

const BarSmall = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		rootStyle,
		task,
		isDateChangeable,
		isProgressChangeable,
		onEventStart,
	} = props;

	// *** USE STATE ***
	const [isHovered, setIsHovered] = useState<boolean>(false);

	// *** CONDITIONALS ***
	const progressPoint = getProgressPoint(
		task.progressWidth + task.x1,
		task.y,
		task.height
	);

	return (
		<g
			style={rootStyle}
			tabIndex={0}
			onMouseEnter={() => setIsHovered(() => true)}
			onMouseLeave={() => setIsHovered(() => false)}
		>
			{/* BAR */}
			<BarDisplay
				x={task.x1}
				y={task.y}
				progressX={task.progressX}
				progressWidth={task.progressWidth}
				barCornerRadius={task.barCornerRadius}
				onMouseDown={(e) => {
					isDateChangeable === true && onEventStart("move", task, e);
				}}
				// style
				rootStyle={{
					...barDisplayDefaultProps,
					height: task.height,
				}}
			/>

			{/* PROGRESS HANDLE */}
			<g>
				{isProgressChangeable === true && (
					<BarProgressHandle
						progressPoint={progressPoint}
						onMouseDown={(e) => {
							onEventStart("progress", task, e);
						}}
						// style
						rootStyle={{
							fill: "#ddd",
							cursor: "ew-resize",
							opacity: isHovered ? 1 : 0,
							visibility: isHovered ? "visible" : "hidden",
						}}
					/>
				)}
			</g>
		</g>
	);
};
BarSmall.defaultProps = defaultProps;

export default BarSmall;
