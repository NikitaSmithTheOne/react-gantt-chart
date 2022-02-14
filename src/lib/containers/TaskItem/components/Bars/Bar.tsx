// *** NPM ***
import React, { useState } from "react";

// *** OTHER ***
import BarDisplay from "./BarDisplay";
import BarDateHandle from "./BarDateHandle";
import BarProgressHandle from "./BarProgressHandle";
import { getProgressPoint } from "../../../../helpers/bar-helper";
import { IProps as TaskItemProps } from "../../TaskItem";

// *** STYLES ***
import styles from "./Bar.module.css";

// *** TYPES ***
type IProps = TaskItemProps;

const Bar = (props: IProps) => {
	// *** PROPS ***
	const {
		// arrowIndent,
		isDateChangeable,
		// isDelete,
		isProgressChangeable,
		isSelected,
		onEventStart,
		rtl,
		task,
		// taskHeight,
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
			className={styles.barWrapper}
			tabIndex={0}
			onMouseEnter={() => setIsHovered(() => true)}
			onMouseLeave={() => setIsHovered(() => false)}
		>
			<BarDisplay
				x={task.x1}
				y={task.y}
				width={task.x2 - task.x1}
				height={task.height}
				progressX={task.progressX}
				progressWidth={task.progressWidth}
				barCornerRadius={task.barCornerRadius}
				styles={task.styles}
				isSelected={isSelected}
				onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) => {
					isDateChangeable && onEventStart("move", task, e);
				}}
			/>
			<g className="handleGroup">
				{isDateChangeable && (
					<g>
						{/* left */}
						<BarDateHandle
							x={task.x1 + 1}
							y={task.y + 1}
							width={task.handleWidth}
							height={handleHeight}
							barCornerRadius={task.barCornerRadius}
							onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) => {
								onEventStart("start", task, e);
							}}
							style={{
								fill: "#ddd",
								cursor: "ew-resize",
								opacity: isHovered ? 1 : 0,
								visibility: isHovered ? "visible" : "hidden",
							}}
						/>
						{/* right */}
						<BarDateHandle
							x={task.x2 - task.handleWidth - 1}
							y={task.y + 1}
							width={task.handleWidth}
							height={handleHeight}
							barCornerRadius={task.barCornerRadius}
							onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) => {
								onEventStart("end", task, e);
							}}
							style={{
								fill: "#ddd",
								cursor: "ew-resize",
								opacity: isHovered ? 1 : 0,
								visibility: isHovered ? "visible" : "hidden",
							}}
						/>
					</g>
				)}
				{isProgressChangeable && (
					<BarProgressHandle
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

export default Bar;
