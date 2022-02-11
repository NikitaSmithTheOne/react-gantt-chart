// *** NPM ***
import React from "react";
import { OptionalKeys } from "../../../../types/custom";

// *** OTHER ***

// *** STYLES ***
import style from "./Bar.module.css";

// *** TYPES ***
interface IProps {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	isSelected?: boolean;
	/* progress start point */
	progressX?: number;
	progressWidth?: number;
	barCornerRadius?: number;
	styles?: {
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
	// progress start point
	progressX: 50,
	progressWidth: 100,
	barCornerRadius: 5,
	styles: {
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
		// progress start point
		progressX,
		progressWidth,
		barCornerRadius,
		styles,
		onMouseDown,
	} = props;

	// *** CONDITIONALS ***
	const processColor = isSelected
		? styles.progressSelectedColor
		: styles.progressColor;

	const barColor = isSelected
		? styles.backgroundSelectedColor
		: styles.backgroundColor;

	return (
		<svg style={{ overflow: "visible" }}>
			<g onMouseDown={onMouseDown}>
				<rect
					x={x}
					width={width}
					y={y}
					height={height}
					ry={barCornerRadius}
					rx={barCornerRadius}
					fill={barColor}
					className={style.barBackground}
				/>
				<rect
					x={progressX}
					width={progressWidth}
					y={y}
					height={height}
					ry={barCornerRadius}
					rx={barCornerRadius}
					fill={processColor}
				/>
			</g>
		</svg>
	);
};

BarDisplay.defaultProps = defaultProps;

export default BarDisplay;
