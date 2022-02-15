// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export interface IProps {
	rootStyle?: React.CSSProperties;
	headerStyle?: React.CSSProperties;
	columnStyle?: React.CSSProperties;
	columnSeparatorStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		display: "table",
		borderBottom: "#e6e4e4 1px solid",
		borderTop: "#e6e4e4 1px solid",
		borderLeft: "#e6e4e4 1px solid",
	},
	headerStyle: {
		display: "table-row",
		listStyle: "none",
	},
	columnStyle: {
		display: "table-cell",
		verticalAlign: "middle",
	},
	columnSeparatorStyle: {
		borderRight: "1px solid rgb(196, 196, 196)",
		opacity: 1,
		marginLeft: "-2px",
	},
};

const TaskListHeader = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const { rootStyle, headerStyle, columnStyle, columnSeparatorStyle } = props;

	return (
		<div style={rootStyle}>
			{/* HEADER */}
			<div style={headerStyle}>
				{/* COLUMN */}
				<div style={columnStyle}>&nbsp;Name</div>

				{/* SEPARATOR */}
				<div style={columnSeparatorStyle} />

				{/* COLUMN */}
				<div style={columnStyle}>&nbsp;From</div>

				{/* SEPARATOR */}
				<div style={columnSeparatorStyle} />

				{/* COLUMN */}
				<div style={columnStyle}>&nbsp;To</div>
			</div>
		</div>
	);
};
TaskListHeader.defaultProps = defaultProps;

export default TaskListHeader;
