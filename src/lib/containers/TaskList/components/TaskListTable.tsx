// *** NPM ***
import React, { useMemo } from "react";

// *** OTHER ***
import { Task } from "../../../types/public-types";
import { OptionalKeys } from "../../../types/custom";

// *** HELPERS ***
const localeDateStringCache: { [key: string]: string } = {};

const toLocaleDateStringFactory =
	(locale: string) =>
	(date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
		const key = date.toString();
		let lds = localeDateStringCache[key];
		if (!lds) {
			lds = date.toLocaleDateString(locale, dateTimeOptions);
			localeDateStringCache[key] = lds;
		}
		return lds;
	};

// *** TYPES ***
const dateTimeOptions: Intl.DateTimeFormatOptions = {
	weekday: "short",
	year: "numeric",
	month: "long",
	day: "numeric",
};

export interface IProps {
	tasks: Task[];
	locale: string;
	selectedTaskId: string;
	setSelectedTask: (taskId: string) => void;
	onExpanderClick: (task: Task) => void;
	// styles
	rootStyle?: React.CSSProperties;
	tableRowStyle?: React.CSSProperties;
	tableCellStyle?: React.CSSProperties;
	tableCellWrapperStyle?: React.CSSProperties;
	expanderStyle?: React.CSSProperties;
	expanderEmptyStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		display: "table",
		borderBottom: "#e6e4e4 1px solid",
		borderLeft: "#e6e4e4 1px solid",
	},
	tableRowStyle: {
		display: "table-row",
		textOverflow: "ellipsis",
	},
	tableCellStyle: {
		display: "table-cell",
		verticalAlign: "middle",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	tableCellWrapperStyle: {
		display: "flex",
	},
	expanderStyle: {
		color: "rgb(86 86 86)",
		fontSize: "0.6rem",
		padding: "0.15rem 0.2rem 0rem 0.2rem",
		userSelect: "none",
		cursor: "pointer",
	},
	expanderEmptyStyle: {
		fontSize: "0.6rem",
		paddingLeft: "1rem",
		userSelect: "none",
	},
};

const TaskListTable = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		tasks,
		locale,
		onExpanderClick,
		// selectedTaskId,
		// setSelectedTask,
		// styles
		rootStyle,
		tableRowStyle,
		tableCellStyle,
		tableCellWrapperStyle,
		expanderStyle,
		expanderEmptyStyle,
	} = props;

	// *** HANDLERS ***
	const toLocaleDateString = useMemo(
		() => toLocaleDateStringFactory(locale),
		[locale]
	);

	return (
		// ROOT
		<div style={rootStyle}>
			{/* TABLE ROWS */}
			{tasks.map((t) => {
				// expander
				let expanderSymbol = "";
				if (t.hideChildren === true) {
					expanderSymbol = "▶";
				} else if (t.hideChildren === false) {
					expanderSymbol = "▼";
				}

				return (
					// TABLE ROW
					<div style={tableRowStyle} key={`${t.id}row`}>
						{/* TABLE CELL */}
						<div style={tableCellStyle} title={t.name}>
							{/* TABLE CELL WRAPPER */}
							<div style={tableCellWrapperStyle}>
								{/* EXPANDER */}
								<div
									style={expanderSymbol ? expanderStyle : expanderEmptyStyle}
									onClick={() => onExpanderClick(t)}
								>
									{expanderSymbol}
								</div>

								{/* TEXT */}
								<div>{t.name}</div>
							</div>
						</div>

						{/* TABLE CELL */}
						<div style={tableCellStyle}>
							&nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
						</div>

						{/* TABLE CELL */}
						<div style={tableCellStyle}>
							&nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
						</div>
					</div>
				);
			})}
		</div>
	);
};
TaskListTable.defaultProps = defaultProps;

export default TaskListTable;
