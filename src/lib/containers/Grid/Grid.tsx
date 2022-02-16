// *** NPM ***
import React from "react";

// *** OTHER ***
import GridBody, { IProps as GridBodyProps } from "./components/GridBody";

// *** TYPES ***
export type IProps = GridBodyProps;

// WHICH KIND OF JOKE IS THIS? =)
const Grid = (props: IProps) => {
	return (
		<svg style={{ overflow: "visible" }}>
			{/* ROOT */}
			<g>
				{/* GRID BODY */}
				<GridBody {...props} />
			</g>
		</svg>
	);
};

export default Grid;
