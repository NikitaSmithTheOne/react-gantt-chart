// *** NPM ***
import React, { useMemo } from "react";

// *** OTHER ***
import { Task } from "../../../types/public-types";

// *** STYLES ***
import styles from "./TaskListTable.module.css";

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
	rowHeight: number;
	rowWidth: string;
	fontFamily: string;
	fontSize: string;
	locale: string;
	tasks: Task[];
	selectedTaskId: string;
	setSelectedTask: (taskId: string) => void;
	onExpanderClick: (task: Task) => void;
}

const TaskListTable = (props: IProps) => {
	// *** PROPS ***
	const {
		fontFamily,
		fontSize,
		locale,
		onExpanderClick,
		rowHeight,
		rowWidth,
		// selectedTaskId,
		// setSelectedTask,
		tasks,
	} = props;

	// *** HANDLERS ***
	const toLocaleDateString = useMemo(
		() => toLocaleDateStringFactory(locale),
		[locale]
	);

	return (
		<div
			className={styles.taskListWrapper}
			style={{
				fontFamily: fontFamily,
				fontSize: fontSize,
			}}
		>
			{tasks.map((t) => {
				let expanderSymbol = "";
				if (t.hideChildren === false) {
					expanderSymbol = "▼";
				} else if (t.hideChildren === true) {
					expanderSymbol = "▶";
				}

				return (
					<div
						className={styles.taskListTableRow}
						style={{ height: rowHeight }}
						key={`${t.id}row`}
					>
						<div
							className={styles.taskListCell}
							style={{
								minWidth: rowWidth,
								maxWidth: rowWidth,
							}}
							title={t.name}
						>
							<div className={styles.taskListNameWrapper}>
								<div
									className={
										expanderSymbol
											? styles.taskListExpander
											: styles.taskListEmptyExpander
									}
									onClick={() => onExpanderClick(t)}
								>
									{expanderSymbol}
								</div>
								<div>{t.name}</div>
							</div>
						</div>
						<div
							className={styles.taskListCell}
							style={{
								minWidth: rowWidth,
								maxWidth: rowWidth,
							}}
						>
							&nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
						</div>
						<div
							className={styles.taskListCell}
							style={{
								minWidth: rowWidth,
								maxWidth: rowWidth,
							}}
						>
							&nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TaskListTable;
