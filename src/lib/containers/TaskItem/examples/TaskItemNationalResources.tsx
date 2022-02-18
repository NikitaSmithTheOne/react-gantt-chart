// *** NPM ***
import React, { useEffect, useRef, useState } from "react";

// *** OTHER ***
import BarSmall from "../../Bars/BarSmall";
import { BarTask } from "../../../types/bar-task";
import MileStone from "../components/MileStone";
import Project from "../components/Project";
import { GanttContentMoveAction } from "../../../types/gantt-task-actions";
import { OptionalKeys } from "../../../types/custom";
import BarNationalResources from "../../Bars/examples/BarNationalResources";

// *** TYPES ***
export type IProps = {
	task: BarTask;
	arrowIndent: number;
	taskHeight: number;
	isProgressChangeable: boolean;
	isDateChangeable: boolean;
	isDelete: boolean;
	isSelected: boolean;
	rtl: boolean;
	onEventStart: (
		action: GanttContentMoveAction,
		selectedTask: BarTask,
		event?: React.MouseEvent | React.KeyboardEvent
	) => any;
	// styles
	taskItemTextStyle?: React.CSSProperties;
	taskItemTextOutsideStyle?: React.CSSProperties;
};
type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;

export const defaultProps: TOptionalProps = {
	taskItemTextStyle: {
		fill: "#1B2026",
		textAnchor: "middle",
		fontWeight: "lighter",
		dominantBaseline: "central",
		userSelect: "none",
		pointerEvents: "none",
	},
	taskItemTextOutsideStyle: {
		fill: "#1B2026",
		textAnchor: "start",
		userSelect: "none",
		pointerEvents: "none",
	},
};

const TaskItemNationalResources = (props: IProps & typeof defaultProps) => {
	// *** PROPS ***
	const {
		task,
		arrowIndent,
		isDelete,
		taskHeight,
		isSelected,
		rtl,
		onEventStart,
		// styles
		taskItemTextStyle,
		taskItemTextOutsideStyle,
	} = props;

	// *** USE STATE ***
	const [taskItem, setTaskItem] = useState<JSX.Element>(<div />);
	const [isTextInside, setIsTextInside] = useState(true);

	// *** USE REF ***
	const textRef = useRef<SVGTextElement>(null);

	// *** HELPERS ***
	const getX = () => {
		const width = task.x2 - task.x1;
		const hasChild = task.barChildren.length > 0;

		if (isTextInside) {
			return task.x1 + width * 0.5;
		}

		if (rtl && textRef.current) {
			return (
				task.x1 -
				textRef.current.getBBox().width -
				arrowIndent * +hasChild -
				arrowIndent * 0.2
			);
		} else {
			return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
		}
	};

	// *** HANDLERS ***
	const onRootKeyDownHandler = (e: React.KeyboardEvent<SVGGElement>): void => {
		switch (e.key) {
			case "Delete": {
				if (isDelete) onEventStart("delete", task, e);
				break;
			}
		}
		e.stopPropagation();
	};

	// *** USE EFFECT ***
	useEffect(() => {
		switch (task.typeInternal) {
			case "milestone":
				setTaskItem(<MileStone {...props} />);
				break;
			case "project":
				setTaskItem(<Project {...props} />);
				break;
			case "smalltask":
				setTaskItem(<BarSmall {...props} />);
				break;
			default:
				setTaskItem(() => (
					<BarNationalResources
						task={props.task}
						rtl={props.rtl}
						onEventStart={props.onEventStart}
						isDateChangeable={props.isDateChangeable}
					/>
				));
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [task, isSelected]);

	useEffect(() => {
		if (textRef.current) {
			setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1);
		}
	}, [textRef, task]);

	return (
		<svg>
			{/* ROOT */}
			<g
				onKeyDown={(e) => onRootKeyDownHandler(e)}
				onMouseEnter={(e) => {
					onEventStart("mouseenter", task, e);
				}}
				onMouseLeave={(e) => {
					onEventStart("mouseleave", task, e);
				}}
				onDoubleClick={(e) => {
					onEventStart("dblclick", task, e);
				}}
				onFocus={() => {
					onEventStart("select", task);
				}}
			>
				{/* TASK ITEM */}
				{taskItem}

				{/* TASK ITEM TEXT */}
				<text
					style={isTextInside ? taskItemTextStyle : taskItemTextOutsideStyle}
					x={getX()}
					y={task.y + taskHeight * 0.5}
					ref={textRef}
				>
					{task.name}
				</text>
			</g>
		</svg>
	);
};
TaskItemNationalResources.defaultProps = defaultProps;

export default TaskItemNationalResources;
