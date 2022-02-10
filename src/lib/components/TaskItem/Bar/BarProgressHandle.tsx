// *** NPM ***
import React from "react";

// *** STYLES ***
import styles from "./bar.module.css";

// *** TYPES ***
type IProps = {
	progressPoint: string;
	onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};

const BarProgressHandle = (props: IProps) => {
	// *** PROPS ***
	const { onMouseDown, progressPoint } = props;

	return (
		<polygon
			className={styles.barHandle}
			points={progressPoint}
			onMouseDown={onMouseDown}
		/>
	);
};

export default BarProgressHandle;
