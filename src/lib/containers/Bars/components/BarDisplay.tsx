// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export interface IProps {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	progressX?: number;
	progressWidth?: number;
	barCornerRadius?: number;
	onMouseDown?: (
		event: React.MouseEvent<SVGPolygonElement, MouseEvent>
	) => void;
	// style
	rootStyle?: React.CSSProperties;
	barStyle?: React.CSSProperties;
	progressStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	x: 0,
	y: 0,
	width: 300,
	height: 50,
	// style
	rootStyle: {},
	barStyle: {
		userSelect: "none",
		strokeWidth: 0,
		fill: "#B8C2CC",
	},
	progressStyle: {
		fill: "#A3A3FF",
	},
	// progress start point
	progressX: 50,
	progressWidth: 100,
	barCornerRadius: 5,
	onMouseDown: (event) => console.log("BarDisplay click"),
};

const BarDisplay = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		x,
		y,
		width,
		height,
		progressX,
		progressWidth,
		barCornerRadius,
		onMouseDown,
		// style
		rootStyle,
		barStyle,
		progressStyle,
	} = props;

	return (
		<g style={rootStyle} onMouseDown={onMouseDown}>
			{/* BAR */}
			<rect
				style={barStyle}
				x={x}
				y={y}
				height={height}
				width={width}
				rx={barCornerRadius}
				ry={barCornerRadius}
			/>

			{/* PROGRESS */}
			<rect
				style={progressStyle}
				x={progressX}
				y={y}
				height={height}
				width={progressWidth}
				rx={barCornerRadius}
				ry={barCornerRadius}
			/>
		</g>
	);
};
BarDisplay.defaultProps = defaultProps;

export default BarDisplay;
