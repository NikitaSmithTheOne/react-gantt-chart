// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
type IProps = {
	style?: React.CSSProperties;
	progressPoint?: string;
	onMouseDown?: (
		event: React.MouseEvent<SVGPolygonElement, MouseEvent>
	) => void;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

const defaultProps: TOptionalProps = {
	style: {
		fill: "#ddd",
		cursor: "ew-resize",
	},
	progressPoint: "15,10,25,10,20,0",
	onMouseDown: (e) => console.log(e),
};

const BarProgressHandle = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const { style, onMouseDown, progressPoint } = props;

	return (
		<polygon style={style} points={progressPoint} onMouseDown={onMouseDown} />
	);
};
BarProgressHandle.defaultProps = defaultProps;

export default BarProgressHandle;
