// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export type IProps = {
	progressPoint?: string;
	onMouseDown?: (
		event: React.MouseEvent<SVGPolygonElement, MouseEvent>
	) => void;
	// style
	rootStyle?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	progressPoint: "15,10,25,10,20,0",
	onMouseDown: (e) => console.log(e),
	// style
	rootStyle: {
		fill: "#ddd",
		cursor: "ew-resize",
	},
};

const BarProgressHandle = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		progressPoint,
		onMouseDown,
		// style
		rootStyle,
	} = props;

	return (
		<polygon
			style={rootStyle}
			points={progressPoint}
			onMouseDown={onMouseDown}
		/>
	);
};
BarProgressHandle.defaultProps = defaultProps;

export default BarProgressHandle;
