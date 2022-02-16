// *** NPM ***
import React, { ReactChild } from "react";

// *** OTHER ***
import { Task } from "../../../types/public-types";
import { addToDate } from "../../../helpers/date-helper";
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export type IProps = {
	tasks: Task[];
	dates: Date[];
	svgWidth: number;
	rowHeight: number;
	columnWidth: number;
	todayColor: string;
	rtl: boolean;
	// styles
	gridRowStyle?: React.CSSProperties;
	gridRowLineStyle?: React.CSSProperties;
	gridTickStyle?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	gridRowStyle: {
		fill: "#fff",
	},
	gridRowLineStyle: {
		stroke: "#ebeff2",
	},
	gridTickStyle: {
		stroke: "#e6e4e4",
	},
};

const GridBody = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		tasks,
		dates,
		rtl,
		rowHeight,
		columnWidth,
		svgWidth,
		todayColor,
		// style
		gridRowStyle,
		gridRowLineStyle,
		gridTickStyle,
	} = props;

	// *** CONDITIONALS ***
	const nowDate = new Date();
	let y = 0;
	let tickX = 0;

	// Grid Rows + Row Lines
	const gridRows: ReactChild[] = [];
	const rowLines: ReactChild[] = [
		<line
			key="RowLineFirst"
			style={gridRowLineStyle}
			x="0"
			y1={0}
			x2={svgWidth}
			y2={0}
		/>,
	];

	for (const task of tasks) {
		// Grid Rows
		gridRows.push(
			<rect
				style={gridRowStyle}
				key={"Row" + task.id}
				x="0"
				y={y}
				width={svgWidth}
				height={rowHeight}
			/>
		);

		// Rows Lines
		rowLines.push(
			<line
				key={"RowLine" + task.id}
				style={gridRowLineStyle}
				x="0"
				y1={y + rowHeight}
				x2={svgWidth}
				y2={y + rowHeight}
			/>
		);
		y += rowHeight;
	}

	// Ticks + Today
	const ticks: ReactChild[] = [];
	let today: ReactChild = <rect />;
	for (let i = 0; i < dates.length; i++) {
		const date = dates[i];

		// Ticks
		ticks.push(
			<line
				key={date.getTime()}
				style={gridTickStyle}
				x1={tickX}
				y1={0}
				x2={tickX}
				y2={y}
			/>
		);

		// Today
		// DOES ANYONE CAN READ SUCH STUPID IF-STATEMENTS BRIEFLY????
		// I DON'T THINK SO
		if (
			(i + 1 !== dates.length &&
				date.getTime() < nowDate.getTime() &&
				dates[i + 1].getTime() >= nowDate.getTime()) ||
			// if current date is last
			(i !== 0 &&
				i + 1 === dates.length &&
				date.getTime() < nowDate.getTime() &&
				addToDate(
					date,
					date.getTime() - dates[i - 1].getTime(),
					"millisecond"
				).getTime() >= nowDate.getTime())
		) {
			today = (
				<rect
					x={tickX}
					y={0}
					width={columnWidth}
					height={y}
					fill={todayColor}
				/>
			);
		}

		// rtl for today
		if (
			rtl &&
			i + 1 !== dates.length &&
			date.getTime() >= nowDate.getTime() &&
			dates[i + 1].getTime() < nowDate.getTime()
		) {
			today = (
				<rect
					x={tickX + columnWidth}
					y={0}
					width={columnWidth}
					height={y}
					fill={todayColor}
				/>
			);
		}

		tickX += columnWidth;
	}

	return (
		<svg style={{ overflow: "visible" }}>
			{/* ROOT */}
			<g>
				{/* ROWS */}
				<g>{gridRows}</g>

				{/* ROW LINES */}
				<g>{rowLines}</g>

				{/* TICKS */}
				<g>{ticks}</g>

				{/* TODAY */}
				<g>{today}</g>
			</g>
		</svg>
	);
};
GridBody.defaultProps = defaultProps;

export default GridBody;
