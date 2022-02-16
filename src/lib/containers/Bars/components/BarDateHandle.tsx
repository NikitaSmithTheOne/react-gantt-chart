// *** NPM ***
import React from "react";
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
type IProps = {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	barCornerRadius?: number;
	onMouseDown?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
	style?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

const defaultProps: TOptionalProps = {
	x: 0,
	y: 0,
	width: 10,
	height: 30,
	barCornerRadius: 5,
	onMouseDown: (e) => console.log(e),
	style: {
		fill: "#ddd",
		cursor: "ew-resize",
	},
};

const BarDateHandle = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const { x, y, width, height, barCornerRadius, onMouseDown, style } = props;

	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			ry={barCornerRadius}
			rx={barCornerRadius}
			onMouseDown={onMouseDown}
			style={style}
		/>
	);
};
BarDateHandle.defaultProps = defaultProps;

export default BarDateHandle;
