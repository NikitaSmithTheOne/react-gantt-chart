// *** NPM ***
import React, { SyntheticEvent, useRef, useEffect } from "react";

// *** OTHER ***
import { OptionalKeys } from "../types/custom";

// *** TYPES ***
export interface IProps {
	scroll: number;
	svgWidth: number;
	taskListWidth: number;
	rtl: boolean;
	onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
	// style
	rootStyle?: React.CSSProperties;
	bodyStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		overflow: "auto",
		maxWidth: "100%",
	},
	bodyStyle: {
		height: 1,
	},
};

const HorizontalScroll = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		onScroll,
		rtl,
		scroll,
		svgWidth,
		taskListWidth,
		// style
		rootStyle,
		bodyStyle,
	} = props;

	// *** USE REF ***
	const scrollRef = useRef<HTMLDivElement>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scroll;
		}
	}, [scroll]);

	return (
		// ROOT
		<div
			style={{
				...rootStyle,
				margin: rtl
					? `0px ${taskListWidth}px 0px 0px`
					: `0px 0px 0px ${taskListWidth}px`,
			}}
			dir="ltr"
			ref={scrollRef}
			onScroll={onScroll}
		>
			{/* BODY */}
			<div style={{ ...bodyStyle, width: svgWidth }} />
		</div>
	);
};
HorizontalScroll.defaultProps = defaultProps;

export default HorizontalScroll;
