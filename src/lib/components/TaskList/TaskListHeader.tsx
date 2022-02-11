// *** NPM ***
import React from "react";

// *** STYLES ***
import styles from "./TaskListHeader.module.css";

// *** TYPES ***
export interface IProps {
	headerHeight: number;
	rowWidth: string;
	fontFamily: string;
	fontSize: string;
}

const TaskListHeader = (props: IProps) => {
	// *** PROPS ***
	const { fontFamily, fontSize, headerHeight, rowWidth } = props;

	return (
		<div
			className={styles.ganttTable}
			style={{
				fontFamily: fontFamily,
				fontSize: fontSize,
			}}
		>
			<div
				className={styles.ganttTable_Header}
				style={{
					height: headerHeight - 2,
				}}
			>
				<div
					className={styles.ganttTable_HeaderItem}
					style={{
						minWidth: rowWidth,
					}}
				>
					&nbsp;Name
				</div>
				<div
					className={styles.ganttTable_HeaderSeparator}
					style={{
						height: headerHeight * 0.5,
						marginTop: headerHeight * 0.2,
					}}
				/>
				<div
					className={styles.ganttTable_HeaderItem}
					style={{
						minWidth: rowWidth,
					}}
				>
					&nbsp;From
				</div>
				<div
					className={styles.ganttTable_HeaderSeparator}
					style={{
						height: headerHeight * 0.5,
						marginTop: headerHeight * 0.25,
					}}
				/>
				<div
					className={styles.ganttTable_HeaderItem}
					style={{
						minWidth: rowWidth,
					}}
				>
					&nbsp;To
				</div>
			</div>
		</div>
	);
};

export default TaskListHeader;
