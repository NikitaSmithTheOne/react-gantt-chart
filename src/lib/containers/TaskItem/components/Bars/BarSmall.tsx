// *** NPM ***
import React, { useState } from "react";

// *** OTHER ***
import { getProgressPoint } from "../../../../helpers/bar-helper";
import BarDisplay from "./BarDisplay";
import BarProgressHandle from "./BarProgressHandle";
import { IProps as TaskItemProps } from "../../TaskItem";

// *** STYLES ***
import styles from "./Bar.module.css";

// *** TYPES ***
type IProps = TaskItemProps;

const BarSmall = (props: IProps) => {
	// *** PROPS ***
	const {
		// arrowIndent,
		isDateChangeable,
		// isDelete,
		isProgressChangeable,
		isSelected,
		onEventStart,
		// rtl,
		task,
		// taskHeight,
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
				fillStyle={task.styles}
				isSelected={isSelected}
				onMouseDown={(e) => {
					isDateChangeable && onEventStart("move", task, e);
				}}
			/>
			<g>
				{isProgressChangeable && (
					<BarProgressHandle
						style={{
							fill: "#ddd",
							cursor: "ew-resize",
							opacity: isHovered ? 1 : 0,
							visibility: isHovered ? "visible" : "hidden",
						}}
						progressPoint={progressPoint}
						onMouseDown={(e) => {
							onEventStart("progress", task, e);
						}}
					/>
				)}
			</g>
		</g>
	);
};

export default BarSmall;
