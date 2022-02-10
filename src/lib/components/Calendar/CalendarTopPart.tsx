// *** NPM ***
import React from "react";

// *** OTHER ***
import styles from "./Calendar.module.css";

// *** TYPES ***
type IProps = {
	value: string;
	x1Line: number;
	y1Line: number;
	y2Line: number;
	xText: number;
	yText: number;
};

const CalendarTopPart = (props: IProps) => {
	// *** PROPS ***
	const { value, x1Line, xText, y1Line, y2Line, yText } = props;

	return (
		<g className="calendarTop">
			<line
				x1={x1Line}
				y1={y1Line}
				x2={x1Line}
				y2={y2Line}
				className={styles.calendarTopTick}
				key={value + "line"}
			/>
			<text
				key={value + "text"}
				y={yText}
				x={xText}
				className={styles.calendarTopText}
			>
				{value}
			</text>
		</g>
	);
};

export default CalendarTopPart;
