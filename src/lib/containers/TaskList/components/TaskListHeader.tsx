// *** NPM ***
import React from "react";

// *** OTHER ***
import { OptionalKeys } from "../../../types/custom";

// *** TYPES ***
export interface IProps {
	columns?: (JSX.Element | string)[];
	// style
	rootStyle?: React.CSSProperties;
	headerStyle?: React.CSSProperties;
	columnStyle?: React.CSSProperties;
	columnSeparatorStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	columns: ["Name", "From", "To"],
	// style
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
	const {
		columns,
		// style
		rootStyle,
		headerStyle,
		columnStyle,
		columnSeparatorStyle,
	} = props;

	// *** CONDITIONALS ***
	const headerBody: JSX.Element[] = [];
	columns.forEach((column, index) => {
		const columnElement = (
			<>
				{/* COLUMN */}
				<div style={columnStyle}>{column}</div>

				{/* SEPARATOR */}
				{index !== columns.length - 1 && <div style={columnSeparatorStyle} />}
			</>
		);

		headerBody.push(columnElement);
	});

	return (
		// ROOT
		<div style={rootStyle}>
			{/* HEADER */}
			<div style={headerStyle}>
				{/* BODY */}
				{headerBody}
			</div>
		</div>
	);
};
TaskListHeader.defaultProps = defaultProps;

export default TaskListHeader;
