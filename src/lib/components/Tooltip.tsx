// *** NPM ***
import React, { useRef, useEffect, useState } from "react";

// *** OTHER ***
import { Task } from "../types/public-types";
import { BarTask } from "../types/bar-task";
import { OptionalKeys } from "../types/custom";

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
	children: JSX.Element | string;
	// style
	rootStyle?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		position: "absolute",
		display: "flex",
		flexShrink: 0,
		pointerEvents: "none",
		userSelect: "none",
	},
};

const Tooltip = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		children,
		arrowIndent,
		headerHeight,
		rowHeight,
		rtl,
		scrollX,
		scrollY,
		svgContainerHeight,
		svgContainerWidth,
		task,
		taskListWidth,
		// style
		rootStyle,
	} = props;

	// *** USE STATE ***
	const [relatedY, setRelatedY] = useState<number>(0);
	const [relatedX, setRelatedX] = useState<number>(0);

	// *** USE REF ***
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	// *** CHECKERS ***
	const isVisible: boolean = relatedX !== 0 && relatedY !== 0;

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
	}, [
		task,
		arrowIndent,
		scrollX,
		scrollY,
		headerHeight,
		taskListWidth,
		rowHeight,
		svgContainerHeight,
		svgContainerWidth,
		rtl,
	]);

	return (
		// ROOT
		<div
			ref={tooltipRef}
			style={{
				...rootStyle,
				left: relatedX,
				top: relatedY,
				visibility: isVisible ? "visible" : "hidden",
			}}
		>
			{/* TOOLTIP BODY */}
			{children}
		</div>
	);
};
Tooltip.defaultProps = defaultProps;

export default Tooltip;

export const StandardTooltipContent = (props: ITooltipContentProps) => {
	// *** PROPS ***
	const { task, fontFamily, fontSize } = props;

	return (
		<div
			style={{
				background: "#fff",
				padding: "12px",
				boxShadow:
					"0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
				fontFamily,
				fontSize,
			}}
		>
			{/* DATES RANGE */}
			<b style={{ fontSize: fontSize + 6 }}>{`${
				task.name
			}: ${task.start.getDate()}-${
				task.start.getMonth() + 1
			}-${task.start.getFullYear()} - ${task.end.getDate()}-${
				task.end.getMonth() + 1
			}-${task.end.getFullYear()}`}</b>

			{/* DURATION */}
			{task.end.getTime() - task.start.getTime() !== 0 && (
				<p
					style={{
						fontSize: "12px",
						marginBottom: "6px",
						color: "#666",
					}}
				>{`Duration: ${~~(
					(task.end.getTime() - task.start.getTime()) /
					(1000 * 60 * 60 * 24)
				)} day(s)`}</p>
			)}

			{/* PROGRESS */}
			<p
				style={{
					fontSize: "12px",
					marginBottom: "6px",
					color: "#666",
				}}
			>
				{!!task.progress && `Progress: ${task.progress} %`}
			</p>
		</div>
	);
};
