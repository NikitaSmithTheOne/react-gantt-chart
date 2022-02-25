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
	expanderSymbolOpen?: JSX.Element | string;
	expanderSymbolClose?: JSX.Element | string;
	expanderSymbolEmpty?: JSX.Element | string;
	onExpanderClick: (task: Task) => void;
	// conditionals
	// TODO: MAKE MORE FLEXIBLE RENDERING (TILL NOW LEAVE IT LIKE SO)
	showStartDateColumn?: boolean;
	showEndDateColumn?: boolean;
	// styles
	rootStyle?: React.CSSProperties;
	tableRowStyle?: React.CSSProperties;
	tableRowStyleProject?: React.CSSProperties;
	tableCellStyle?: React.CSSProperties;
	tableCellStyleProject?: React.CSSProperties;
	tableCellStyleTask?: React.CSSProperties;
	tableCellStyleMileStone?: React.CSSProperties;
	tableCellWrapperStyle?: React.CSSProperties;
	expanderStyle?: React.CSSProperties;
	expanderEmptyStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	expanderSymbolOpen: "▼",
	expanderSymbolClose: "▶",
	expanderSymbolEmpty: "",
	// conditionals
	showStartDateColumn: true,
	showEndDateColumn: true,
	// styles
	rootStyle: {
		display: "table",
		borderBottom: "#e6e4e4 1px solid",
		borderLeft: "#e6e4e4 1px solid",
	},
	tableRowStyle: {
		display: "table-row",
		textOverflow: "ellipsis",
	},
	tableRowStyleProject: {},
	tableCellStyle: {
		display: "table-cell",
		verticalAlign: "middle",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	tableCellStyleProject: {},
	tableCellStyleTask: {},
	tableCellStyleMileStone: {},
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
		expanderSymbolOpen,
		expanderSymbolClose,
		expanderSymbolEmpty,
		onExpanderClick,
		// conditionals
		showStartDateColumn,
		showEndDateColumn,
		// styles
		rootStyle,
		tableRowStyle,
		tableRowStyleProject,
		tableCellStyle,
		tableCellStyleProject,
		tableCellStyleTask,
		tableCellStyleMileStone,
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
				let expanderSymbol: JSX.Element | string = expanderSymbolEmpty;
				if (t.hideChildren === true) {
					expanderSymbol = expanderSymbolClose;
				} else if (t.hideChildren === false) {
					expanderSymbol = expanderSymbolOpen;
				}

				// styles
				const rowStyle: React.CSSProperties = {
					...tableRowStyle,
					...(t.type === "project" ? tableRowStyleProject : {}),
				};

				const cellStyle: React.CSSProperties = {
					...tableCellStyle,
					...(t.type === "project" ? tableCellStyleProject : {}),
					...(t.type === "task" ? tableCellStyleTask : {}),
					...(t.type === "milestone" ? tableCellStyleMileStone : {}),
				};

				return (
					// TABLE ROW
					<div style={rowStyle} key={`${t.id}row`}>
						{/* PRIMARY CELL */}
						<div style={cellStyle} title={t.name}>
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

						{/* START DATE CELL */}
						{showStartDateColumn === true && (
							<div style={cellStyle}>
								&nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
							</div>
						)}

						{/* END DATE CELL */}
						{showEndDateColumn === true && (
							<div style={cellStyle}>
								&nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};
TaskListTable.defaultProps = defaultProps;

export default TaskListTable;
