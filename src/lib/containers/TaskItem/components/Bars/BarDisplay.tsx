// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../../types/custom";

// *** TYPES ***
interface IProps {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	isSelected?: boolean;
	barStyle?: React.CSSProperties;
	progressStyle?: React.CSSProperties;
	/* progress start point */
	progressX?: number;
	progressWidth?: number;
	barCornerRadius?: number;
	// TODO: BETTER TO OUTSOURCE IT...
	fillStyle?: {
		backgroundColor: string;
		backgroundSelectedColor: string;
		progressColor: string;
		progressSelectedColor: string;
	};
	onMouseDown?: (
		event: React.MouseEvent<SVGPolygonElement, MouseEvent>
	) => void;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

const defaultProps: TOptionalProps = {
	x: 0,
	y: 0,
	width: 300,
	height: 50,
	isSelected: false,
	barStyle: {
		// to be honest idk why it's here =)
		userSelect: "none",
		strokeWidth: 0,
	},
	progressStyle: {},
	// progress start point
	progressX: 50,
	progressWidth: 100,
	barCornerRadius: 5,
	fillStyle: {
		backgroundColor: "black",
		backgroundSelectedColor: "yellow",
		progressColor: "green",
		progressSelectedColor: "orange",
	},
	onMouseDown: (event) => console.log("BarDisplay click"),
};

const BarDisplay = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		x,
		y,
		width,
		height,
		isSelected,
		barStyle,
		progressStyle,
		// progress start point
		progressX,
		progressWidth,
		barCornerRadius,
		fillStyle,
		onMouseDown,
	} = props;

	// *** CONDITIONALS ***
	const progressFillColor = isSelected
		? fillStyle.progressSelectedColor
		: fillStyle.progressColor;

	const barFillColor = isSelected
		? fillStyle.backgroundSelectedColor
		: fillStyle.backgroundColor;

	return (
		<svg style={{ overflow: "visible" }}>
			<g onMouseDown={onMouseDown}>
				{/* BAR */}
				<rect
					style={barStyle}
					x={x}
					width={width}
					y={y}
					height={height}
					ry={barCornerRadius}
					rx={barCornerRadius}
					fill={barFillColor}
				/>

				{/* PROGRESS */}
				<rect
					style={progressStyle}
					x={progressX}
					width={progressWidth}
					y={y}
					height={height}
					ry={barCornerRadius}
					rx={barCornerRadius}
					fill={progressFillColor}
				/>
			</g>
		</svg>
	);
};

BarDisplay.defaultProps = defaultProps;

export default BarDisplay;
