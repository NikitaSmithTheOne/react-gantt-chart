// *** NPM ***
import React, { useRef, useEffect, useState } from "react";

// *** OTHER ***
import { Task } from "../../types/public-types";
import { BarTask } from "../../types/bar-task";

// *** STYLES ***
import styles from "./Tooltip.module.css";

// *** TYPES ***
export interface ITooltipContentProps {
	task: Task;
	fontSize: string;
	fontFamily: string;
}

export type IProps = {
	task: BarTask;
	arrowIndent: number;
	rtl: boolean;
	svgContainerHeight: number;
	svgContainerWidth: number;
	svgWidth: number;
	headerHeight: number;
	taskListWidth: number;
	scrollX: number;
	scrollY: number;
	rowHeight: number;
	fontSize: string;
	fontFamily: string;
	TooltipContent: React.FC<ITooltipContentProps>;
};

const Tooltip = (props: IProps) => {
	// *** PROPS ***
	const {
		TooltipContent,
		arrowIndent,
		fontFamily,
		fontSize,
		headerHeight,
		rowHeight,
		rtl,
		scrollX,
		scrollY,
		svgContainerHeight,
		svgContainerWidth,
		// svgWidth,
		task,
		taskListWidth,
	} = props;

	// *** USE STATE ***
	const [relatedY, setRelatedY] = useState(0);
	const [relatedX, setRelatedX] = useState(0);

	// *** USE REF ***
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (tooltipRef.current) {
			const tooltipHeight = tooltipRef.current.offsetHeight * 1.1;
			const tooltipWidth = tooltipRef.current.offsetWidth * 1.1;

			let newRelatedY = task.index * rowHeight - scrollY + headerHeight;
			let newRelatedX: number;
			if (rtl) {
				newRelatedX = task.x1 - arrowIndent * 1.5 - tooltipWidth - scrollX;
				if (newRelatedX < 0) {
					newRelatedX = task.x2 + arrowIndent * 1.5 - scrollX;
				}
				const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
				if (tooltipLeftmostPoint > svgContainerWidth) {
					newRelatedX = svgContainerWidth - tooltipWidth;
					newRelatedY += rowHeight;
				}
			} else {
				newRelatedX = task.x2 + arrowIndent * 1.5 + taskListWidth - scrollX;
				const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
				const fullChartWidth = taskListWidth + svgContainerWidth;
				if (tooltipLeftmostPoint > fullChartWidth) {
					newRelatedX =
						task.x1 +
						taskListWidth -
						arrowIndent * 1.5 -
						scrollX -
						tooltipWidth;
				}
				if (newRelatedX < taskListWidth) {
					newRelatedX = svgContainerWidth + taskListWidth - tooltipWidth;
					newRelatedY += rowHeight;
				}
			}

			const tooltipLowerPoint = tooltipHeight + newRelatedY - scrollY;
			if (tooltipLowerPoint > svgContainerHeight - scrollY) {
				newRelatedY = svgContainerHeight - tooltipHeight;
			}
			setRelatedY(newRelatedY);
			setRelatedX(newRelatedX);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		tooltipRef.current,
		task,
		arrowIndent,
		scrollX,
		scrollY,
		headerHeight,
		taskListWidth,
		rowHeight,
		svgContainerHeight,
		svgContainerWidth,
	]);

	return (
		<div
			ref={tooltipRef}
			className={
				relatedX
					? styles.tooltipDetailsContainer
					: styles.tooltipDetailsContainerHidden
			}
			style={{ left: relatedX, top: relatedY }}
		>
			<TooltipContent task={task} fontSize={fontSize} fontFamily={fontFamily} />
		</div>
	);
};

export default Tooltip;

export const StandardTooltipContent = (props: ITooltipContentProps) => {
	// *** PROPS ***
	const { fontFamily, fontSize, task } = props;

	// *** STYLES ***
	const style = {
		fontSize,
		fontFamily,
	};

	return (
		<div className={styles.tooltipDefaultContainer} style={style}>
			<b style={{ fontSize: fontSize + 6 }}>{`${
				task.name
			}: ${task.start.getDate()}-${
				task.start.getMonth() + 1
			}-${task.start.getFullYear()} - ${task.end.getDate()}-${
				task.end.getMonth() + 1
			}-${task.end.getFullYear()}`}</b>
			{task.end.getTime() - task.start.getTime() !== 0 && (
				<p className={styles.tooltipDefaultContainerParagraph}>{`Duration: ${~~(
					(task.end.getTime() - task.start.getTime()) /
					(1000 * 60 * 60 * 24)
				)} day(s)`}</p>
			)}

			<p className={styles.tooltipDefaultContainerParagraph}>
				{!!task.progress && `Progress: ${task.progress} %`}
			</p>
		</div>
	);
};
