// *** NPM ***
import React from "react";

// *** OTHER ***
import Bar from "./Bar";
import BarDisplay from "./components/BarDisplay";

export default {
	title: "lib/containers/Bars/Bar",
	component: Bar,
};

export const Simple = () => {
	return (
		<svg style={{ overflow: "visible" }}>
			<Bar
				rtl={false}
				isDateChangeable={false}
				isProgressChangeable={false}
				// components
				barDisplay={<BarDisplay />}
			/>
		</svg>
	);
};
