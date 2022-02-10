// *** NPM ***
import React from "react";

// *** OTHER ***
import { ViewMode } from "../lib/types/public-types";

// *** TYPES ***
interface IProps {
	isChecked: boolean;
	onViewListChange: (isChecked: boolean) => void;
	onViewModeChange: (viewMode: ViewMode) => void;
}

const ViewSwitcher = (props: IProps) => {
	// *** PROPS ***
	const { onViewModeChange, onViewListChange, isChecked } = props;

	return (
		<div className="ViewContainer">
			<button
				className="Button"
				onClick={() => onViewModeChange(ViewMode.QuarterDay)}
			>
				Quarter of Day
			</button>
			<button
				className="Button"
				onClick={() => onViewModeChange(ViewMode.HalfDay)}
			>
				Half of Day
			</button>
			<button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
				Day
			</button>
			<button
				className="Button"
				onClick={() => onViewModeChange(ViewMode.Week)}
			>
				Week
			</button>
			<button
				className="Button"
				onClick={() => onViewModeChange(ViewMode.Month)}
			>
				Month
			</button>

			<div className="Switch">
				<label className="Switch_Toggle">
					<input
						type="checkbox"
						defaultChecked={isChecked}
						onClick={() => onViewListChange(!isChecked)}
					/>
					<span className="Slider" />
				</label>
				Show Task List
			</div>
		</div>
	);
};

export default ViewSwitcher;
