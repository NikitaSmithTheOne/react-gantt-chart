// *** NPM ***
import React, { SyntheticEvent, useRef, useEffect } from "react";

// *** STYLES ***
import styles from "./HorizontalScroll.module.css";

// *** TYPES ***
interface IProps {
	scroll: number;
	svgWidth: number;
	taskListWidth: number;
	rtl: boolean;
	onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}

export const HorizontalScroll = (props: IProps) => {
	// *** PROPS ***
	const { onScroll, rtl, scroll, svgWidth, taskListWidth } = props;

	// *** USE REF ***
	const scrollRef = useRef<HTMLDivElement>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scroll;
		}
	}, [scroll]);

	return (
		<div
			dir="ltr"
			style={{
				margin: rtl
					? `0px ${taskListWidth}px 0px 0px`
					: `0px 0px 0px ${taskListWidth}px`,
			}}
			className={styles.scroll}
			onScroll={onScroll}
			ref={scrollRef}
		>
			<div style={{ width: svgWidth, height: 1 }} />
		</div>
	);
};
