// *** NPM ***
import React, { SyntheticEvent, useRef, useEffect } from "react";

// *** STYLES ***
import styles from "./VerticalScroll.module.css";

// *** TYPES ***
interface IProps {
	scroll: number;
	ganttHeight: number;
	ganttFullHeight: number;
	headerHeight: number;
	rtl: boolean;
	onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}

const VerticalScroll = (props: IProps) => {
	// *** PROPS ***
	const { ganttFullHeight, ganttHeight, headerHeight, onScroll, rtl, scroll } =
		props;

	// *** USE REF ***
	const scrollRef = useRef<HTMLDivElement>(null);

	// *** USE EFFECT ***
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scroll;
		}
	}, [scroll]);

	return (
		<div
			style={{
				height: ganttHeight,
				marginTop: headerHeight,
				marginLeft: rtl ? "" : "-17px",
			}}
			className={styles.scroll}
			onScroll={onScroll}
			ref={scrollRef}
		>
			<div style={{ height: ganttFullHeight, width: 1 }} />
		</div>
	);
};

export default VerticalScroll;
