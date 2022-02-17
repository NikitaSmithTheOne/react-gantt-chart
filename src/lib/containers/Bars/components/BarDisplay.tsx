// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export interface IProps {
	x?: number;
	y?: number;
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
	// style
	rootStyle: {
		height: "50px",
	},
	barStyle: {
		height: "50px",
		width: "200px",
		userSelect: "none",
		strokeWidth: 0,
		fill: "#B8C2CC",
	},
	progressStyle: {
		height: "50px",
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
				rx={barCornerRadius}
				ry={barCornerRadius}
			/>

			{/* PROGRESS */}
			<rect
				style={progressStyle}
				x={progressX}
				y={y}
				width={progressWidth}
				rx={barCornerRadius}
				ry={barCornerRadius}
			/>
		</g>
	);
};
BarDisplay.defaultProps = defaultProps;

export default BarDisplay;
