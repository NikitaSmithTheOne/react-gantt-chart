// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export type IProps = {
	value: string;
	x1Line: number;
	y1Line: number;
	y2Line: number;
	xText: number;
	yText: number;
	rootStyle?: React.CSSProperties;
	lineStyle?: React.CSSProperties;
	textStyle?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		stroke: "#e6e4e4",
	},
	lineStyle: {
		textAnchor: "middle",
		fill: "#555",
		userSelect: "none",
		pointerEvents: "none",
	},
	textStyle: {
		strokeWidth: 0.2,
		stroke: "#e6e4e4",
	},
};

const CalendarHeader = (props: IProps & typeof defaultProps): JSX.Element => {
	// *** PROPS ***
	const {
		value,
		x1Line,
		xText,
		y1Line,
		y2Line,
		yText,
		// styles
		rootStyle,
		lineStyle,
		textStyle,
	} = props;

	return (
		<g style={rootStyle}>
			{/* LINE */}
			<line
				style={lineStyle}
				key={value + "line"}
				x1={x1Line}
				y1={y1Line}
				x2={x1Line}
				y2={y2Line}
			/>

			{/* TEXT */}
			<text style={textStyle} key={value + "text"} y={yText} x={xText}>
				{value}
			</text>
		</g>
	);
};
CalendarHeader.defaultProps = defaultProps;

export default CalendarHeader;
