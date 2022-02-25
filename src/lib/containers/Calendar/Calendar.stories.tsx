// *** NPM ***
import React from "react";

// *** OTHER ***
import { ViewMode } from "../../types/public-types";
import Calendar from "./Calendar";

export default {
	title: "lib/containers/Calendar/Calendar",
	component: Calendar,
};

// Monthly
export const Daily = () => {
	return (
		<Calendar
			dateSetup={{
				dates: [
					new Date(2022, 10, 26),
					new Date(2022, 10, 27),
					new Date(2022, 10, 28),
					new Date(2022, 10, 29),
					new Date(2022, 10, 30),
					new Date(2022, 11, 1),
					new Date(2022, 11, 2),
					new Date(2022, 11, 3),
					new Date(2022, 11, 4),
				],
				viewMode: ViewMode.Day,
			}}
			locale={"ru"}
			viewMode={ViewMode.Day}
			rtl={false}
			headerHeight={50}
			columnWidth={50}
		></Calendar>
	);
};

// Monthly
export const Monthly = () => {
	return (
		<Calendar
			dateSetup={{
				dates: [
					new Date(2022, 7, 1),
					new Date(2022, 8, 1),
					new Date(2022, 9, 1),
					new Date(2022, 10, 1),
					new Date(2022, 11, 1),
					new Date(2022, 12, 1),
				],
				viewMode: ViewMode.Month,
			}}
			locale={"ru"}
			viewMode={ViewMode.Month}
			rtl
			headerHeight={50}
			columnWidth={100}
		></Calendar>
	);
};
