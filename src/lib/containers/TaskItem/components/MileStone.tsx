// *** NPM ***
import React from "react";

// *** OTHER ***
import { IProps as TaskItemProps } from "../TaskItem";

// *** STYLES ****
import styles from "./MileStone.module.css";

// *** TYPES ***
type IProps = TaskItemProps;

const MileStone = (props: IProps) => {
	// *** PROPS ***
	const {
		// arrowIndent,
		isDateChangeable,
		// isDelete,
		// isProgressChangeable,
		isSelected,
		onEventStart,
		// rtl,
		task,
		// taskHeight,
	} = props;

	// *** HANDLERS ***
	const getBarColor = () => {
		return isSelected
			? task.styles.backgroundSelectedColor
			: task.styles.backgroundColor;
	};

	// *** CONDITIONALS ***
	const transform = `rotate(45 ${task.x1 + task.height * 0.356} 
    ${task.y + task.height * 0.85})`;

	return (
		<g tabIndex={0} className={styles.milestoneWrapper}>
			<rect
				fill={getBarColor()}
				x={task.x1}
				width={task.height}
				y={task.y}
				height={task.height}
				rx={task.barCornerRadius}
				ry={task.barCornerRadius}
				transform={transform}
				className={styles.milestoneBackground}
				onMouseDown={(e) => {
					isDateChangeable && onEventStart("move", task, e);
				}}
			/>
		</g>
	);
};

export default MileStone;
