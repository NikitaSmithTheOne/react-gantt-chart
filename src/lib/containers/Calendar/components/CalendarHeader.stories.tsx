// *** NPM ***
import React from "react";

// *** OTHER ***
import CalendarHeader from "./CalendarHeader";

export default {
	title: "lib/containers/Calendar/components/CalendarHeader",
	component: CalendarHeader,
};

// Simple
export const Simple = () => {
	return (
		<CalendarHeader
			value={"Header"}
			x1Line={500}
			y1Line={0}
			y2Line={25}
			xText={250}
			yText={25}
		/>
	);
};
