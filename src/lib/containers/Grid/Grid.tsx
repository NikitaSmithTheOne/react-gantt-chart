// *** NPM ***
import React from "react";

// *** OTHER ***
import GridBody, { IProps as GridBodyProps } from "./components/GridBody";

// *** TYPES ***
export type IProps = GridBodyProps;

const Grid = (props: IProps) => {
	return (
		<g className="grid">
			<GridBody {...props} />
		</g>
	);
};

export default Grid;
