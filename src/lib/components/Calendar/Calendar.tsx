// *** NPM ***
import React, { ReactChild } from "react";

// *** OTHER ***
import { ViewMode } from "../../types/public-types";
import CalendarTopPart from "./CalendarTopPart";
import {
	getCachedDateTimeFormat,
	getDaysInMonth,
	getLocaleMonth,
	getWeekNumberISO8601,
} from "../../helpers/date-helper";
import { DateSetup } from "../../types/date-setup";

// *** STYLES ***
import styles from "./calendar.module.css";

// *** TYPES ***
export type IProps = {
	dateSetup: DateSetup;
	locale: string;
	viewMode: ViewMode;
	rtl: boolean;
	headerHeight: number;
	columnWidth: number;
	fontFamily: string;
	fontSize: string;
};

export const Calendar = (props: IProps) => {
	// *** PROPS ***
	const {
		columnWidth,
		dateSetup,
		fontFamily,
		fontSize,
		headerHeight,
		locale,
		rtl,
		viewMode,
	} = props;

	const getCalendarValuesForMonth = () => {
		const topValues: ReactChild[] = [];
		const bottomValues: ReactChild[] = [];
		const topDefaultHeight = headerHeight * 0.5;
		for (let i = 0; i < dateSetup.dates.length; i++) {
			const date = dateSetup.dates[i];
			const bottomValue = getLocaleMonth(date, locale);
			bottomValues.push(
				<text
					key={bottomValue + date.getFullYear()}
					y={headerHeight * 0.8}
					x={columnWidth * i + columnWidth * 0.5}
					className={styles.calendarBottomText}
				>
					{bottomValue}
				</text>
			);
			if (
				i === 0 ||
				date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
			) {
				const topValue = date.getFullYear().toString();
				let xText: number;
				if (rtl) {
					xText = (6 + i + date.getMonth() + 1) * columnWidth;
				} else {
					xText = (6 + i - date.getMonth()) * columnWidth;
				}
				topValues.push(
					<CalendarTopPart
						key={topValue}
						value={topValue}
						x1Line={columnWidth * i}
						y1Line={0}
						y2Line={topDefaultHeight}
						xText={xText}
						yText={topDefaultHeight * 0.9}
					/>
				);
			}
		}
		return [topValues, bottomValues];
	};

	const getCalendarValuesForWeek = () => {
		const topValues: ReactChild[] = [];
		const bottomValues: ReactChild[] = [];
		let weeksCount: number = 1;
		const topDefaultHeight = headerHeight * 0.5;
		const dates = dateSetup.dates;
		for (let i = dates.length - 1; i >= 0; i--) {
			const date = dates[i];
			let topValue = "";
			if (i === 0 || date.getMonth() !== dates[i - 1].getMonth()) {
				// top
				topValue = `${getLocaleMonth(date, locale)}, ${date.getFullYear()}`;
			}
			// bottom
			const bottomValue = `W${getWeekNumberISO8601(date)}`;

			bottomValues.push(
				<text
					key={date.getTime()}
					y={headerHeight * 0.8}
					x={columnWidth * (i + +rtl)}
					className={styles.calendarBottomText}
				>
					{bottomValue}
				</text>
			);

			if (topValue) {
				// if last day is new month
				if (i !== dates.length - 1) {
					topValues.push(
						<CalendarTopPart
							key={topValue}
							value={topValue}
							x1Line={columnWidth * i + weeksCount * columnWidth}
							y1Line={0}
							y2Line={topDefaultHeight}
							xText={columnWidth * i + columnWidth * weeksCount * 0.5}
							yText={topDefaultHeight * 0.9}
						/>
					);
				}
				weeksCount = 0;
			}
			weeksCount++;
		}
		return [topValues, bottomValues];
	};

	const getCalendarValuesForDay = () => {
		const topValues: ReactChild[] = [];
		const bottomValues: ReactChild[] = [];
		const topDefaultHeight = headerHeight * 0.5;
		const dates = dateSetup.dates;
		for (let i = 0; i < dates.length; i++) {
			const date = dates[i];
			const bottomValue = date.getDate().toString();

			bottomValues.push(
				<text
					key={date.getTime()}
					y={headerHeight * 0.8}
					x={columnWidth * i + columnWidth * 0.5}
					className={styles.calendarBottomText}
				>
					{bottomValue}
				</text>
			);
			if (
				i + 1 !== dates.length &&
				date.getMonth() !== dates[i + 1].getMonth()
			) {
				const topValue = getLocaleMonth(date, locale);

				topValues.push(
					<CalendarTopPart
						key={topValue + date.getFullYear()}
						value={topValue}
						x1Line={columnWidth * (i + 1)}
						y1Line={0}
						y2Line={topDefaultHeight}
						xText={
							columnWidth * (i + 1) -
							getDaysInMonth(date.getMonth(), date.getFullYear()) *
								columnWidth *
								0.5
						}
						yText={topDefaultHeight * 0.9}
					/>
				);
			}
		}
		return [topValues, bottomValues];
	};

	const getCalendarValuesForOther = () => {
		const topValues: ReactChild[] = [];
		const bottomValues: ReactChild[] = [];
		const ticks = viewMode === ViewMode.HalfDay ? 2 : 4;
		const topDefaultHeight = headerHeight * 0.5;
		const dates = dateSetup.dates;
		for (let i = 0; i < dates.length; i++) {
			const date = dates[i];
			const bottomValue = getCachedDateTimeFormat(locale, {
				hour: "numeric",
			}).format(date);

			bottomValues.push(
				<text
					key={date.getTime()}
					y={headerHeight * 0.8}
					x={columnWidth * (i + +rtl)}
					className={styles.calendarBottomText}
					fontFamily={fontFamily}
				>
					{bottomValue}
				</text>
			);
			if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
				const topValue = `${date.getDate()} ${getLocaleMonth(date, locale)}`;
				topValues.push(
					<CalendarTopPart
						key={topValue + date.getFullYear()}
						value={topValue}
						x1Line={columnWidth * i + ticks * columnWidth}
						y1Line={0}
						y2Line={topDefaultHeight}
						xText={columnWidth * i + ticks * columnWidth * 0.5}
						yText={topDefaultHeight * 0.9}
					/>
				);
			}
		}

		return [topValues, bottomValues];
	};

	let topValues: ReactChild[] = [];
	let bottomValues: ReactChild[] = [];
	switch (dateSetup.viewMode) {
		case ViewMode.Month:
			[topValues, bottomValues] = getCalendarValuesForMonth();
			break;
		case ViewMode.Week:
			[topValues, bottomValues] = getCalendarValuesForWeek();
			break;
		case ViewMode.Day:
			[topValues, bottomValues] = getCalendarValuesForDay();
			break;
		default:
			[topValues, bottomValues] = getCalendarValuesForOther();
			break;
	}
	return (
		<g className="calendar" fontSize={fontSize} fontFamily={fontFamily}>
			<rect
				x={0}
				y={0}
				width={columnWidth * dateSetup.dates.length}
				height={headerHeight}
				className={styles.calendarHeader}
			/>
			{bottomValues} {topValues}
		</g>
	);
};
