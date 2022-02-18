// *** NPM ***
import React from "react";

// *** OTHER ***
import { IProps as TaskItemProps } from "../TaskItem/examples/TaskItemOriginal";

// *** STYLES ***
import { OptionalKeys } from "../../types/custom";

// *** TYPES ***
export type IProps = Pick<
	TaskItemProps,
	"rtl" | "isDateChangeable" | "isProgressChangeable"
> & {
	// style
	rootStyle?: React.CSSProperties;
	// components
	barDisplay?: JSX.Element;
	leftBarDateHandle?: JSX.Element;
	rightBarDateHandle?: JSX.Element;
	barProgressHandle?: JSX.Element;
	// handlers
	onMouseEnter?: React.MouseEventHandler<SVGGElement>;
	onMouseLeave?: React.MouseEventHandler<SVGGElement>;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	// style
	rootStyle: {
		cursor: "pointer",
		outline: "none",
	},
	// components
	barDisplay: <></>,
	leftBarDateHandle: <></>,
	rightBarDateHandle: <></>,
	barProgressHandle: <></>,
	// handlers
	onMouseEnter: () => null,
	onMouseLeave: () => null,
};

const Bar = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		isDateChangeable,
		isProgressChangeable,
		// style
		rootStyle,
		// components
		barDisplay,
		leftBarDateHandle,
		rightBarDateHandle,
		barProgressHandle,
		// handlers
		onMouseEnter,
		onMouseLeave,
	} = props;

	return (
		<g
			style={rootStyle}
			tabIndex={0}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{/* BAR DISPLAY */}
			{barDisplay}

			{/* DATE/PROGRESS HANDLES */}
			<g>
				{isDateChangeable === true && (
					// DATE HANDLES
					<g>
						{/* LEFT SIDE */}
						{leftBarDateHandle}

						{/* RIGHT SIDE */}
						{rightBarDateHandle}
					</g>
				)}

				{/* PROGRESS HANDLES */}
				{isProgressChangeable === true && barProgressHandle}
			</g>
		</g>
	);
};
Bar.defaultProps = defaultProps;

export default Bar;
