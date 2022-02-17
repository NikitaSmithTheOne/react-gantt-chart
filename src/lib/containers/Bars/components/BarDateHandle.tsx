// *** NPM ***
import React from "react";
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export type IProps = {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	barCornerRadius?: number;
	onMouseDown?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
	// style
	rootStyle?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	x: 0,
	y: 0,
	width: 10,
	height: 30,
	barCornerRadius: 5,
	onMouseDown: (e) => console.log(e),
	// style
	rootStyle: {
		fill: "#ddd",
		cursor: "ew-resize",
	},
};

const BarDateHandle = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		x,
		y,
		width,
		height,
		barCornerRadius,
		onMouseDown,
		// style
		rootStyle,
	} = props;

	return (
		<rect
			style={rootStyle}
			x={x}
			y={y}
			width={width}
			height={height}
			ry={barCornerRadius}
			rx={barCornerRadius}
			onMouseDown={onMouseDown}
		/>
	);
};
BarDateHandle.defaultProps = defaultProps;

export default BarDateHandle;
