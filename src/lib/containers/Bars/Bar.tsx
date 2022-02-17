// *** NPM ***
import React, { useState } from "react";

// *** OTHER ***
import BarDisplay from "./components/BarDisplay";
import BarDateHandle from "./components/BarDateHandle";
import BarProgressHandle from "./components/BarProgressHandle";
import { getProgressPoint } from "../../helpers/bar-helper";
import { IProps as TaskItemProps } from "../TaskItem/TaskItem";

// *** STYLES ***
import { OptionalKeys } from "../../types/custom";

// *** TYPES ***
export type IProps = { rootStyle?: React.CSSProperties } & Pick<
	TaskItemProps,
	| "task"
	| "rtl"
	| "isSelected"
	| "isDateChangeable"
	| "isProgressChangeable"
	| "onEventStart"
>;
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		cursor: "pointer",
		outline: "none",
	},
};

const Bar = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		rootStyle,
		task,
		rtl,
		isSelected,
		isDateChangeable,
		isProgressChangeable,
		onEventStart,
	} = props;

	// *** USE STATE ***
	const [isHovered, setIsHovered] = useState<boolean>(false);

	// *** CONDITIONALS ***
	const progressPoint = getProgressPoint(
		+!rtl * task.progressWidth + task.progressX,
		task.y,
		task.height
	);

	const handleHeight = task.height - 2;

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
				width={task.x2 - task.x1}
				height={task.height}
				progressX={task.progressX}
				progressWidth={task.progressWidth}
				barCornerRadius={task.barCornerRadius}
				fillStyle={task.styles}
				isSelected={isSelected}
				onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) => {
					isDateChangeable === true && onEventStart("move", task, e);
				}}
			/>

			{/* DATE HANDLERS */}
			<g>
				{isDateChangeable === true && (
					<g>
						{/* LEFT SIDE */}
						<BarDateHandle
							x={task.x1 + 1}
							y={task.y + 1}
							width={task.handleWidth}
							height={handleHeight}
							barCornerRadius={task.barCornerRadius}
							onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) => {
								onEventStart("start", task, e);
							}}
							// style
							rootStyle={{
								fill: "#ddd",
								cursor: "ew-resize",
								opacity: isHovered ? 1 : 0,
								visibility: isHovered ? "visible" : "hidden",
							}}
						/>

						{/* RIGHT SIDE */}
						<BarDateHandle
							x={task.x2 - task.handleWidth - 1}
							y={task.y + 1}
							width={task.handleWidth}
							height={handleHeight}
							barCornerRadius={task.barCornerRadius}
							onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) => {
								onEventStart("end", task, e);
							}}
							// style
							rootStyle={{
								fill: "#ddd",
								cursor: "ew-resize",
								opacity: isHovered ? 1 : 0,
								visibility: isHovered ? "visible" : "hidden",
							}}
						/>
					</g>
				)}

				{/* PROGRESS HANDLERS */}
				{isProgressChangeable === true && (
					<BarProgressHandle
						style={{
							fill: "#ddd",
							cursor: "ew-resize",
							opacity: isHovered ? 1 : 0,
							visibility: isHovered ? "visible" : "hidden",
						}}
						progressPoint={progressPoint}
						onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) => {
							onEventStart("progress", task, e);
						}}
					/>
				)}
			</g>
		</g>
	);
};
Bar.defaultProps = defaultProps;

export default Bar;
