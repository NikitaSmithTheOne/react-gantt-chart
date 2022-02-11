// *** NPM ***
import React from "react";

// *** STYLES ***
import style from "./Bar.module.css";

// *** TYPES ***
type IProps = {
	x: number;
	y: number;
	width: number;
	height: number;
	isSelected: boolean;
	/* progress start point */
	progressX: number;
	progressWidth: number;
	barCornerRadius: number;
	styles: {
		backgroundColor: string;
		backgroundSelectedColor: string;
		progressColor: string;
		progressSelectedColor: string;
	};
	onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};

const BarDisplay = (props: IProps) => {
	// *** PROPS ***
	const {
		barCornerRadius,
		height,
		isSelected,
		onMouseDown,
		progressWidth,
		progressX,
		styles,
		width,
		x,
		y,
	} = props;

	// *** HANDLERS ***
	const getProcessColor = () => {
		return isSelected ? styles.progressSelectedColor : styles.progressColor;
	};

	const getBarColor = () => {
		return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
	};

	return (
		<g onMouseDown={onMouseDown}>
			<rect
				x={x}
				width={width}
				y={y}
				height={height}
				ry={barCornerRadius}
				rx={barCornerRadius}
				fill={getBarColor()}
				className={style.barBackground}
			/>
			<rect
				x={progressX}
				width={progressWidth}
				y={y}
				height={height}
				ry={barCornerRadius}
				rx={barCornerRadius}
				fill={getProcessColor()}
			/>
		</g>
	);
};

export default BarDisplay;
