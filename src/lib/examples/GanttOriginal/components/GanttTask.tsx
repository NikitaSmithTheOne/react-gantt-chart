// *** NPM ***
import React, { useRef, useEffect } from "react";

// *** OTHER ***
import Grid, { IProps as GridProps } from "../../../containers/Grid/Grid";
import Calendar, {
	IProps as CalendarProps,
} from "../../../containers/Calendar/Calendar";
import GanttTaskContent, {
	IProps as GanttTaskContentProps,
} from "./GanttTaskContentOriginal";

// *** STYLES ***
import styles from "./GanttTask.module.css";

// *** TYPES ***
export type IProps = {
	gridProps: GridProps;
	calendarProps: CalendarProps;
	barProps: GanttTaskContentProps;
	ganttHeight: number;
	scrollY: number;
	scrollX: number;
};

const GanttTask = (props: IProps) => {
	// *** PROPS ***
	const { gridProps, calendarProps, barProps, ganttHeight, scrollY, scrollX } =
		props;

	// *** USE REF ***
	const ganttSVGRef = useRef<SVGSVGElement>(null);
	const horizontalContainerRef = useRef<HTMLDivElement>(null);
	const verticalGanttContainerRef = useRef<HTMLDivElement>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (horizontalContainerRef.current) {
			horizontalContainerRef.current.scrollTop = scrollY;
		}
	}, [scrollY]);

	useEffect(() => {
		if (verticalGanttContainerRef.current) {
			verticalGanttContainerRef.current.scrollLeft = scrollX;
		}
	}, [scrollX]);

	// *** CONDITIONALS ***
	const newBarProps = { ...barProps, svg: ganttSVGRef };

	return (
		<div
			className={styles.ganttVerticalContainer}
			ref={verticalGanttContainerRef}
			dir="ltr"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={gridProps.svgWidth}
				height={calendarProps.headerHeight}
				fontFamily={barProps.fontFamily}
			>
				<Calendar {...calendarProps} />
			</svg>
			<div
				ref={horizontalContainerRef}
				className={styles.horizontalContainer}
				style={
					ganttHeight
						? { height: ganttHeight, width: gridProps.svgWidth }
						: { width: gridProps.svgWidth }
				}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={gridProps.svgWidth}
					height={barProps.rowHeight * barProps.tasks.length}
					fontFamily={barProps.fontFamily}
					ref={ganttSVGRef}
				>
					<Grid {...gridProps} />
					<GanttTaskContent {...newBarProps} />
				</svg>
			</div>
		</div>
	);
};

export default GanttTask;
