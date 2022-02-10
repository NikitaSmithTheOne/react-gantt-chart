// *** NPM ***
import React from "react";

// *** STYLES ***
import styles from "./Bar.module.css";

// *** TYPES ***
type IProps = {
	x: number;
	y: number;
	width: number;
	height: number;
	barCornerRadius: number;
	onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
};

const BarDateHandle = (props: IProps) => {
	// *** PROPS ***
	const { barCornerRadius, height, onMouseDown, width, x, y } = props;

	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			className={styles.barHandle}
			ry={barCornerRadius}
			rx={barCornerRadius}
			onMouseDown={onMouseDown}
		/>
	);
};

export default BarDateHandle;
