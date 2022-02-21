// *** NPM ***
import React, { SyntheticEvent, useRef, useEffect } from "react";

// *** OTHER ***
import { OptionalKeys } from "../types/custom";

// *** TYPES ***
export interface IProps {
	scroll: number;
	onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
	// style
	rootStyle?: React.CSSProperties;
	bodyStyle?: React.CSSProperties;
}
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	rootStyle: {
		overflow: "hidden auto",
		width: "17px",
		flexShrink: 0,
	},
	bodyStyle: {
		width: 1,
	},
};

const VerticalScroll = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		scroll,
		onScroll,
		// style
		rootStyle,
		bodyStyle,
	} = props;

	// *** USE REF ***
	const scrollRef = useRef<HTMLDivElement>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scroll;
		}
	}, [scroll]);

	return (
		// ROOT
		<div style={rootStyle} onScroll={onScroll} ref={scrollRef}>
			{/* BODY */}
			<div style={bodyStyle} />
		</div>
	);
};
VerticalScroll.defaultProps = defaultProps;

export default VerticalScroll;
